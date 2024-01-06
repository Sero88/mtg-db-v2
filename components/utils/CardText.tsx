import { ScryfallSymbol } from "@/types/scryfall";
import { CardTextListItem } from "../search/fields/CardTextListItem";
import { SelectorListItem } from "@/types/searchSelector";

export function createSymbolsMapAndArray(symbols: ScryfallSymbol[]) {
	const symbolsMap = new Map<String, ScryfallSymbol>();

	const customSymbols = [
		{ symbol: "−", svg_uri: "", english: "− planeswalker minus ability" },
		{ symbol: "+", svg_uri: "", english: "+ planeswalker plus ability" }, //todo how to filter plus sign regex
	] as ScryfallSymbol[];

	const allSymbols = [...symbols, ...customSymbols];

	allSymbols?.forEach((symbol) => symbolsMap.set(symbol.english, symbol));

	const symbolsArray: SelectorListItem[] = [];

	symbolsMap.forEach((value) => {
		symbolsArray.push({
			value: value.english,
			display: <CardTextListItem symbol={value} />,
		});
	});

	return { symbolsMap, symbolsArray };
}
