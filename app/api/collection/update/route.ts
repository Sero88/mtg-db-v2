import { Helpers } from "@/utils/helpers";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";

export async function PATCH(request: Request) {
	const data = await request.json();

	const { scryfallId, prices } = data;

	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const updateResults = await cardCollection.updatePrices(scryfallId, prices);

	if (updateResults.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(Helpers.apiResponse(true, updateResults?.data));
	} else {
		return NextResponse.json(Helpers.apiResponse(false, updateResults?.data), {
			status: 400,
		});
	}
}
