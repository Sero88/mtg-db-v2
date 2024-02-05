import { ScryfallSymbol } from "@/types/scryfall";
import { CardTextListItem } from "../search/fields/CardTextListItem";
import { SelectorListItem } from "@/types/searchSelector";
import Image from "next/image";
import { MoveKeys } from "@/types/cardText";

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

export function symbolTranslation(
	selectedSymbol: { svg_uri: string | null; english: string },
	index: number
) {
	return selectedSymbol?.svg_uri ? (
		<Image
			src={selectedSymbol.svg_uri}
			width={12}
			height={12}
			unoptimized={true}
			alt={selectedSymbol.english}
			key={index + selectedSymbol.english}
		/>
	) : (
		<span key={index + selectedSymbol?.english}>{selectedSymbol?.english}</span>
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

export function getSymbolsSearchString(text: string) {
	const unclosedBraceIndexes: number[] = [];
	const openBraces: number[] = [];

	for (let i = 0; i < text.length; i++) {
		if (text[i] == "{") {
			unclosedBraceIndexes.push(i);
			openBraces.push(i);
		} else if (text[i] == "}" && unclosedBraceIndexes.length > 0) {
			unclosedBraceIndexes.pop();
		}
	}

	if (!unclosedBraceIndexes.length) {
		return { searchText: text, position: { start: 0, end: text.length } };
	}

	const position = {
		start: unclosedBraceIndexes[0],
		//if there is another open brace stop there, otherwise until the end of the text
		end:
			openBraces[openBraces.findIndex((value) => value == unclosedBraceIndexes[0]) + 1] ??
			text.length,
	};

	const searchText = text.slice(position.start >= 0 ? position.start + 1 : 0, position.end);

	return { searchText, position };
}

export function getNewHightlightedItemBasedOnMovement(
	key: MoveKeys,
	highlightedOptionIndex: number,
	filteredSymbolsLength: number
) {
	if (key == MoveKeys.DOWN) {
		return highlightedOptionIndex + 2 > filteredSymbolsLength ? 0 : highlightedOptionIndex + 1;
	} else {
		return highlightedOptionIndex - 1 < 0
			? filteredSymbolsLength - 1
			: highlightedOptionIndex - 1;
	}
}
