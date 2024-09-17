import { Helpers } from "@/utils/helpers";
import { NextResponse } from "next/server";
import { CardCollection } from "@/models/cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export async function GET() {
	const session = await getServerSession(authOptions);

	//todo remove after testing 👇
	console.log("session ===> ", session);
	//todo remove after testing 👆

	const cardCollection = new CardCollection();
	const isConnected = await cardCollection.dbConnect();

	if (!isConnected) {
		return NextResponse.json({ error: "Unable to connect to database." }, { status: 500 });
	}

	const results = await cardCollection.getDailyFlavorText();

	if (results.status == DbModelResponseEnum.SUCCESS) {
		return NextResponse.json(Helpers.apiResponse(true, results?.data));
	} else {
		return NextResponse.json(Helpers.apiResponse(false, results?.data), {
			status: 400,
		});
	}
}
