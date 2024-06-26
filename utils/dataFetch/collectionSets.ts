import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { Helpers } from "../helpers";

export async function getCollectionSets() {
	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return Helpers.apiResponse(false, null);
	}

	const searchResults = await cardCollection.getSets();

	if (searchResults.status == DbModelResponseEnum.SUCCESS) {
		return Helpers.apiResponse(true, searchResults?.data as string[]);
	} else {
		return Helpers.apiResponse(false, null);
	}
}
