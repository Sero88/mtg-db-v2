import { ScryfallSymbol } from "@/types/scryfall";
import { CardTextListItem } from "../search/fields/CardTextListItem";
import { SelectorListItem } from "@/types/searchSelector";
import Image from "next/image";

export function createSymbolsMapAndArray(symbols: ScryfallSymbol[]) {
	const symbolsMap = new Map<String, ScryfallSymbol>();

	const customSymbols = [
		{ symbol: "{−}", svg_uri: "", english: "− planeswalker minus ability" },
		{ symbol: "{+}", svg_uri: "", english: "+ planeswalker plus ability" }, //todo how to filter plus sign regex
	] as ScryfallSymbol[];

	const allSymbols = [...symbols, ...customSymbols];

	allSymbols?.forEach((symbol) => symbolsMap.set(symbol.symbol, symbol));

	const symbolsArray: SelectorListItem[] = [];

	symbolsMap.forEach((value) => {
		symbolsArray.push({
			value: value.symbol,
			display: <CardTextListItem symbol={value} />,
			searchValue: `${value.symbol}::${value.english}`,
		});
	});

	return { symbolsMap, symbolsArray };
}

export function symbolTranslation(selectedSymbol: { svg_uri: string | null; english: string }) {
	return selectedSymbol?.svg_uri ? (
		<Image
			src={selectedSymbol.svg_uri}
			width={15}
			height={15}
			unoptimized={true}
			alt={selectedSymbol.english}
		/>
	) : (
		<span>{selectedSymbol?.english}</span>
	);
}

export function isSymbolOptionsNeeded(text: string) {
	let openCount = 0;
	let closeCount = 0;
	for (let char of text) {
		if (char === "{") {
			openCount++;
		} else if (char === "}") {
			closeCount++;
		}
	}
	return openCount > closeCount ? true : false;
}
