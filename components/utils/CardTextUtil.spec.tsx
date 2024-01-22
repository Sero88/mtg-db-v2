import { symbolsList } from "@/tests/mocks/symbolList.mock";
import { createSymbolsMapAndArray, isSymbolOptionsNeeded, symbolTranslation } from "./CardTextUtil";
import Image from "next/image";

describe("CardText Utils", () => {
	describe("createSymbolsMapAndArray", () => {
		it("should list all items from array to Map and Array props", () => {
			const symbolsMapAndArray = createSymbolsMapAndArray(symbolsList);

			symbolsMapAndArray.symbolsMap.forEach((symbol) => {
				expect(symbolsMapAndArray.symbolsMap.get(symbol.symbol)).toBeTruthy();
			});

			symbolsMapAndArray.symbolsArray.forEach((symbol) => {
				expect(symbolsMapAndArray.symbolsMap.get(symbol.value)).toBeTruthy();
			});
		});
	});

	describe("symbolTranslation", () => {
		const symbolWithSvg = { svg_uri: "test/test", english: "test symbol" };
		const symbolWithNoSvg = { svg_uri: null, english: "test symbol" };
		it("should return Image component when svg_uri is not empty", () => {
			const translation = symbolTranslation(symbolWithSvg);
			expect(translation).toEqual(
				<Image
					src={symbolWithSvg.svg_uri}
					width={expect.anything()}
					height={expect.anything()}
					unoptimized={true}
					alt={symbolWithSvg.english}
				/>
			);
		});

		it("should return span component when svg_uri is  empty", () => {
			const translation = symbolTranslation(symbolWithNoSvg);
			expect(translation).toEqual(<span>{symbolWithNoSvg?.english}</span>);
		});
	});

	describe("isSymbolOptionsNeeded", () => {
		const shouldBeNeeded = "{test";
		const shouldNotBeNeeded = "{test} and other text";
		it("should return true when there are more '{' chars than '}' chars", () => {
			expect(isSymbolOptionsNeeded(shouldBeNeeded)).toEqual(true);
		});

		it("should return false when curly braces are paired", () => {
			expect(isSymbolOptionsNeeded(shouldNotBeNeeded)).toEqual(false);
		});
	});
});
