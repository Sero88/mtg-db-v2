import axios from "axios";
import { helpers } from "@/utils/helpers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
	}

	const apiUrl = "https://api.scryfall.com";

	const { searchParams } = new URL(request.url);

	const query = searchParams.get("query");
	const unique = searchParams.get("unique");
	const order = searchParams.get("order");
	const page = searchParams.get("page");

	const apiQuery = encodeURIComponent(query as string) + " game:paper lang:en";
	const uniquePrintsQuery = unique ? "&unique=prints" : "";
	const orderQuery = order ? `&order=${order}&dir=asc` : "&order=released&dir=asc"; //direction ascending 1 to XX
	const pageQuery = page ? `&page=${page}` : "&page=1";

	const fullQuery = `${apiUrl}/cards/search/?q=${apiQuery}${orderQuery}${uniquePrintsQuery}${pageQuery}`;
	// console.log(fullQuery);

	try {
		const results = await axios.get(fullQuery);
		return NextResponse.json(helpers.apiResponse(true, results?.data));
	} catch (e: any) {
		if (e?.response?.data?.code == "not_found") {
			return NextResponse.json(
				helpers.apiResponse(false, {
					object: "list",
					total_cards: 0,
					has_more: false,
					data: [],
				}),
				{ status: 200 }
			);
		}
		return NextResponse.json(helpers.apiResponse(false, null), { status: 500 });
	}
}
