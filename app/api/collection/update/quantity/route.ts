import { GeneralUtil } from "@/utils/generalUtil";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";

export async function PATCH(request: Request) {
	const data = await request.json();

	const { card, quantity, type } = data;

	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const updateResults = await cardCollection.setQuantity(card, quantity, type);

	if (updateResults.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(GeneralUtil.apiResponse(true, updateResults?.data));
	} else {
		return NextResponse.json(GeneralUtil.apiResponse(false, updateResults?.data), {
			status: 400,
		});
	}
}
