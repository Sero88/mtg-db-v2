import { GeneralUtil } from "@/utils/generalUtil";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";

export async function POST(request: Request) {
	const data = await request.json();

	const { searchQuery } = data;

	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const results = await cardCollection.getCards(searchQuery);

	if (results.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(GeneralUtil.apiResponse(true, results?.data));
	} else {
		return NextResponse.json(GeneralUtil.apiResponse(false, results?.data), {
			status: 400,
		});
	}
}
