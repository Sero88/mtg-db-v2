import {
	CollectionCard,
	CollectionCardQuantity,
	VersionQuery,
	CollectionCardQuantityTypeEnum,
} from "@/types/collection";
import { ScryfallCard } from "@/types/scryfall";
import { DbModelResponseEnum } from "@/types/utils";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import { connect } from "@/utils/mongodb";
import { Db, MongoClient, ReturnDocument } from "mongodb";

export class CardCollection {
	private db: Db | undefined;
	private client: MongoClient | undefined;

	private responseObject(status: DbModelResponseEnum, data: {}, message = "") {
		return {
			status,
			data,
		};
	}

	private noDbConnectionResponse() {
		console.error("No db connection available.");
		return this.responseObject(DbModelResponseEnum.ERROR, {});
	}

	private async isCardObjectUsedByOtherVersions(card: ScryfallCard) {
		//verify connection
		if (!this.db) {
			return this.noDbConnectionResponse();
		}

		const filter = {
			oracleId: card.oracle_id,
		};

		const results = await this.db
			.collection(process.env.DATABASE_TABLE_VERSIONS!)
			.findOne(filter);

		return !!results ? true : false;
	}

	private async removeCardObject(card: ScryfallCard) {
		//verify connection
		if (!this.db) {
			return this.noDbConnectionResponse();
		}

		const cardFilter = {
			oracleId: card.oracle_id,
		};

		const deleteResult = await this.db
			.collection(process.env.DATABASE_TABLE_CARDS!)
			.deleteOne(cardFilter);

		if (deleteResult?.deletedCount < 1) {
			return false;
		}

		return true;
	}
	private async removeCardVersion(card: ScryfallCard) {
		//verify connection
		if (!this.db) {
			return this.noDbConnectionResponse();
		}

		const filter = {
			scryfallId: card.id,
		};

		const deleteResult = await this.db
			.collection(process.env.DATABASE_TABLE_VERSIONS!)
			.deleteOne(filter);

		if (deleteResult?.deletedCount < 1) {
			return false;
		}

		return true;
	}

	private async upsertCard(cardObject: CollectionCard) {
		if (!this.db) {
			return this.noDbConnectionResponse();
		}

		const filter = {
			oracleId: cardObject.oracleId,
		};

		const update = {
			$set: cardObject,
		};

		const options = {
			upsert: true,
			returnDocument: ReturnDocument.AFTER,
			projection: { _id: 0 },
		};

		const result = await this.db
			.collection(process.env.DATABASE_TABLE_CARDS!)
			.findOneAndUpdate(filter, update, options);

		return result?.value ?? false;
	}

	private async upsertVersion(version: VersionQuery) {
		if (!this.db) {
			return this.noDbConnectionResponse();
		}
		const filter = {
			scryfallId: version.scryfallId,
		};

		const update = {
			$set: version,
		};

		const options = {
			upsert: true,
			returnDocument: ReturnDocument.AFTER,
			projection: { _id: 0 },
		};

		const result = await this.db
			.collection(process.env.DATABASE_TABLE_VERSIONS!)
			.findOneAndUpdate(filter, update, options);

		return result?.value ?? false;
	}

	async dbConnect() {
		try {
			this.client = await connect();

			this.db = this.client.db(process.env.DATABASE_NAME);

			return true;
		} catch (e) {
			return false;
		}
	}

	async dbDisconnect() {
		this.client ? await this.client.close() : false;
	}

	async getQuantitiesByIds(cardIds: string[]) {
		if (!this.db) {
			return this.noDbConnectionResponse();
		}

		const projection = { projection: { scryfallId: 1, quantity: 1, _id: 0 } };

		const results = await this.db
			.collection(process.env.DATABASE_TABLE_VERSIONS as string)
			.find({ scryfallId: { $in: cardIds } }, projection)
			.toArray();

		return this.responseObject(DbModelResponseEnum.SUCCESS, results);
	}

	async removeCard(card: ScryfallCard) {
		const versionDelete = await this.removeCardVersion(card);
		const isBeingUsed = await this.isCardObjectUsedByOtherVersions(card);

		if (!isBeingUsed) {
			const cardObjectDelete = this.removeCardObject(card);
			return versionDelete && cardObjectDelete;
		}

		return !!versionDelete;
	}

	/**
	 *
	 * @param card
	 * @param quantity Note it uses quantity object, not just one type of quantity (ie regulor OR foil). This is so we can update/remove accordingly
	 * @param type Depending on the type passed, only that type will be updated, the other quanity type won't be touched.
	 */
	async setQuantity(
		card: ScryfallCard,
		quantity: CollectionCardQuantity,
		type: CollectionCardQuantityTypeEnum
	) {
		const regularQty = quantity?.[CollectionCardQuantityTypeEnum.REGULAR];
		const foilQty = quantity?.[CollectionCardQuantityTypeEnum.FOIL];

		//if both quantities are now 0, remove card
		if (regularQty === 0 && foilQty === 0) {
			const removeResult = await this.removeCard(card);
			if (!removeResult) {
				return this.responseObject(
					DbModelResponseEnum.ERROR,
					"Something went wrong. Unable to complete set action. Card deletion error. Check server logs."
				);
			}

			return this.responseObject(DbModelResponseEnum.SUCCESS, {
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: 0,
				},
			});
		}

		//there are no cards to remove ignore
		if (!regularQty && !foilQty) {
			return this.responseObject(DbModelResponseEnum.ERROR, "Quantity can't be less than 0");
		}

		const cardCollectionObject = CollectionCardUtil.buildCardQueryObject(card);
		const versionObject = CollectionCardUtil.buildVersionQueryObject(card, quantity, type);

		//create the card object if one does not exist already
		const upsertResults = await this.upsertCard(cardCollectionObject);

		if (!upsertResults) {
			return this.responseObject(
				DbModelResponseEnum.ERROR,
				"Unable to upsert card. Check server logs."
			);
		}

		//update the version object
		const upsertVersionResult = await this.upsertVersion(versionObject);

		if (!upsertVersionResult) {
			return this.responseObject(
				DbModelResponseEnum.ERROR,
				"Unable to upsert version. Check server logs."
			);
		}

		return this.responseObject(DbModelResponseEnum.SUCCESS, upsertVersionResult);
	}
}
