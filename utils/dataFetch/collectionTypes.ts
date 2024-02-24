import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { Helpers } from "../helpers";

export async function getCollectionTypes() {
	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return Helpers.apiResponse(false, null);
	}

	const searchResults = await cardCollection.getTypes();

	if (searchResults.status == DbModelResponseEnum.SUCCESS) {
		return Helpers.apiResponse(true, searchResults?.data);
	} else {
		return Helpers.apiResponse(false, null);
	}
}
