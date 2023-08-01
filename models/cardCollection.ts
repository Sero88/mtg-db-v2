import { CollectionCard } from "@/types/collection";
import { DbModelResponseEnum } from "@/types/utils";
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

		const results = await this.db
			.collection(process.env.DATABASE_TABLE_CARDS!)
			.findOneAndUpdate(filter, update, options);

		return results?.value ?? false;
	}
}
