import { ScryfallCard } from "@/types/scryfall";
import { ScryfallSearchCardData } from "@/types/scryfall";
import axios from "axios";

export async function makeGeneralSearch(searchCardData: ScryfallSearchCardData, page: number = 1) {
	const setParam = getSetParameter(searchCardData.setCode);

	const searchEndpoint =
		"/api/scryfall/cards/?query=" +
		encodeURIComponent(searchCardData.cardName + setParam) +
		"&page=" +
		page;

	const response = await axios.get(searchEndpoint);

	return response?.data?.data as ScryfallCard[];
}

export async function makePrintSearch(searchCardData: ScryfallSearchCardData) {
	const setParam = getSetParameter(searchCardData.setCode);
	const encodedCardNameWithQuotes = `"${encodeURIComponent(searchCardData.cardName)}"`; //gives exact card name, thus the quotes

	const searchEndpoint =
		"/api/scryfall/cards/?order=released&unique=prints&query=!" +
		encodedCardNameWithQuotes +
		setParam;

	const response = await axios.get(searchEndpoint);

	return response?.data?.data as ScryfallCard[];
}

function getSetParameter(setCode: string) {
	return setCode ? ` set:${setCode},s${setCode},p${setCode}` : "";
}
