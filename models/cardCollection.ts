import {
	CollectionCard,
	VersionQuery,
	CollectionCardQuantityTypeEnum,
	Version,
} from "@/types/collection";
import { ScryfallCard } from "@/types/scryfall";
import { SearchQuery, SearchQueryFields } from "@/types/search";
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

	private async getCardVersion(card: ScryfallCard) {
		//verify connection
		if (!this.db) {
			throw new Error("no db connection");
		}

		const filter = {
			scryfallId: card.id,
		};

		const options = {
			projection: { _id: 0 },
		};

		const results = await this.db
			.collection<Version>(process.env.DATABASE_TABLE_VERSIONS!)
			.findOne(filter, options);

		return results ? (results as Version) : null;
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

	async setQuantity(
		card: ScryfallCard,
		type: CollectionCardQuantityTypeEnum,
		newQuantity: number
	) {
		const cardVersion = await this.getCardVersion(card);
		const hasExistingQuantity = cardVersion?.quantity?.[type]! > 0;

		if (
			newQuantity === 0 &&
			hasExistingQuantity &&
			!CollectionCardUtil.versionIsCurrentlyUsed(cardVersion!, type)
		) {
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

		const cardCollectionObject = CollectionCardUtil.buildCardQueryObject(card);
		const versionObject = CollectionCardUtil.buildVersionQueryObject(card, newQuantity, type);

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

	async getTypes() {
		if (!this.db) {
			return this.noDbConnectionResponse();
		}
		const results = await this.db
			.collection(process.env.DATABASE_TABLE_CARDS as string)
			.distinct("types");
		return this.responseObject(DbModelResponseEnum.SUCCESS, results);
	}

	async getCards(searchFields: SearchQueryFields) {
		let queryObject: SearchQuery = { $expr: { $eq: [1, 1] } };
		let setsQuery = { $expr: { $eq: [1, 1] } };
		let rarityQuery = { $expr: { $eq: [1, 1] } };

		if (searchFields.cardName) {
			queryObject.name = CollectionCardUtil.constructTextQuery(searchFields.cardName);
		}

		if (searchFields.cardText) {
			queryObject["cardFaces.oracleText"] = CollectionCardUtil.constructTextQuery(
				searchFields.cardText
			);
		}

		/*

		if (searchFields.cardTypes && searchFields.cardTypes.items.length > 0) {
			//todo: remove after completing searchFields functionality
			//@ts-ignore
			queryObject["types"] = this.constructTypesQuery(
				searchFields.cardTypes.items,
				searchFields.cardTypes.conditionals.allowPartials
			);
		}

		if (searchFields.cardColors && searchFields.cardColors.selected.length > 0) {
			//todo: remove after completing searchFields functionality
			//@ts-ignore
			queryObject["colorIdentity"] = this.constructColorsQuery(searchFields.cardColors);
		}

		if (searchFields.cardStats && Object.keys(searchFields.cardStats).length > 0) {
			//todo: remove after completing searchFields functionality
			//@ts-ignore
			queryObject = this.constructStatQueries(searchFields.cardStats, queryObject);
		}

		if (searchFields.cardSets && searchFields.cardSets.items.length > 0) {
			//todo: remove after completing searchFields functionality
			//@ts-ignore
			setsQuery = this.constructSetsQuery(searchFields.cardSets.items);
		}

		if (searchFields.cardRarity && searchFields.cardRarity.selected.length > 0) {
			//todo: remove after completing searchFields functionality
			//@ts-ignore
			rarityQuery = this.constructRarityQuery(searchFields.cardRarity.selected);
		}
 */
		const queryWithVersions = [
			{
				$lookup: {
					from: process.env.DATABASE_TABLE_VERSIONS,
					localField: "oracleId",
					foreignField: "oracleId",
					as: "versions",
				},
			},
			{
				$match: setsQuery,
			},
			{
				$match: rarityQuery,
			},
			{
				$match: queryObject,
			},
		];

		// {sort:{name: 1},projection: this.findProjection}

		//todo remove after testing 👇
		console.log("search form data: ", searchFields);
		//todo remove after testing 👆

		//todo remove after testing 👇
		console.log("searching query object:", queryWithVersions);
		//todo remove after testing 👆

		//todo remove after testing 👇
		console.log("searching query object:", JSON.stringify(queryWithVersions));
		//todo remove after testing 👆

		const results = await this.db!.collection(process.env.DATABASE_TABLE_CARDS!)
			.aggregate(queryWithVersions)
			.toArray();

		return this.responseObject(DbModelResponseEnum.SUCCESS, results);
	}
}
