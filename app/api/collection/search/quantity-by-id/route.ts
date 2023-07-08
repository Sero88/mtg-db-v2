import { helpers } from "@/utils/helpers";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const jsonCardIds = searchParams.get("cardIds");
	const cardIds = jsonCardIds ? JSON.parse(jsonCardIds) : [];

	if (!cardIds.length) {
		return NextResponse.json(helpers.apiResponse(false, null), { status: 400 });
	}

	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const searchResults = await cardCollection.getQuantitiesByIds(cardIds);

	if (searchResults.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(helpers.apiResponse(true, searchResults?.data));
	} else {
		return NextResponse.json(helpers.apiResponse(false, null), { status: 400 });
	}
}
