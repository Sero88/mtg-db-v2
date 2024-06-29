import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { Helpers } from "../helpers";
import { Version } from "@/types/collection";

export async function getCollectionVersions() {
	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return Helpers.apiResponse(false, null);
	}

	const searchResults = await cardCollection.getAllVersions();

	if (searchResults.status == DbModelResponseEnum.SUCCESS) {
		return Helpers.apiResponse(true, searchResults?.data as Version[]);
	} else {
		return Helpers.apiResponse(false, null);
	}
}
