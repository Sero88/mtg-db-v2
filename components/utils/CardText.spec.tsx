import { symbolsList } from "@/tests/mocks/symbolList.mock";
import { createSymbolsMapAndArray } from "./CardText";

describe("CardText Utils", () => {
	describe("createSymbolsMapAndArray", () => {
		it("should all items from array to Map and Array props", () => {
			const symbolsMapAndArray = createSymbolsMapAndArray(symbolsList);

			symbolsMapAndArray.symbolsMap.forEach((symbol) => {
				expect(symbolsMapAndArray.symbolsMap.get(symbol.english)).toBeTruthy();
			});

			symbolsMapAndArray.symbolsArray.forEach((symbol) => {
				expect(symbolsMapAndArray.symbolsMap.get(symbol.value)).toBeTruthy();
			});
		});
	});
});
