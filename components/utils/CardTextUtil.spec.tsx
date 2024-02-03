import { symbolsList } from "@/tests/mocks/symbolList.mock";
import {
	createSymbolsMapAndArray,
	getSymbolsSearchString,
	isSymbolOptionsNeeded,
	symbolTranslation,
} from "./CardTextUtil";
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

	describe("getSymbolsSearchString", () => {
		it("should return the string after the first opening curly brace", () => {
			const searchText = "Test {This is is another unclosed brace";
			expect(getSymbolsSearchString(searchText)).toEqual({
				position: { start: 5, end: 39 },
				searchText: "This is is another unclosed brace",
			});
		});

		it("should return the string after the first opening curly brace until end of another opening brace", () => {
			const searchText = "{This has a lot { of curly {braces opened} }";
			expect(getSymbolsSearchString(searchText)).toEqual({
				position: { start: 0, end: 16 },
				searchText: "This has a lot ",
			});
		});

		it("should return empty string when there are no curly braces opened", () => {
			const testString = "this is a test with no curly braces opened }";
			expect(getSymbolsSearchString(testString)).toEqual({
				position: { start: 0, end: testString.length },
				searchText: "this is a test with no curly braces opened }",
			});
		});
	});
});
