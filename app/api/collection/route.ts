import { Helpers } from "@/utils/helpers";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";

export async function GET() {
	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const results = await cardCollection.getAllCardsWithVersions();

	if (results.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(Helpers.apiResponse(true, results?.data));
	} else {
		return NextResponse.json(Helpers.apiResponse(false, results?.data), {
			status: 400,
		});
	}
}
