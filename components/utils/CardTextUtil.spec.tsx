import { symbolsList } from "@/tests/mocks/symbolList.mock";
import {
	createSymbolsMapAndArray,
	getNewHightlightedItemBasedOnMovement,
	getSymbolsSearchString,
	isSymbolOptionsNeeded,
	symbolTranslation,
} from "./CardTextUtil";
import Image from "next/image";
import { MoveKeys } from "@/types/cardText";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
		const symbolWithNoSvgAndIcon = { svg_uri: null, english: "test symbol", icon: faCheck };
		it("should return Image component when svg_uri is not empty", () => {
			const translation = symbolTranslation(symbolWithSvg, 0);
			expect(translation).toEqual(
				<Image
					src={symbolWithSvg.svg_uri}
					width={expect.anything()}
					height={expect.anything()}
					unoptimized={true}
					alt={symbolWithSvg.english}
					key={0 + symbolWithSvg.english}
				/>
			);
		});

		it("should return span with icon when svg_uri is empty, but has icon", () => {
			const translation = symbolTranslation(symbolWithNoSvgAndIcon, 0);
			expect(translation).toEqual(
				<span key={0 + symbolWithNoSvgAndIcon?.english}>
					<FontAwesomeIcon icon={symbolWithNoSvgAndIcon?.icon} />
				</span>
			);
		});

		it("should return span component when svg_uri and icon are empty", () => {
			const translation = symbolTranslation(symbolWithNoSvg, 0);
			expect(translation).toEqual(
				<span key={0 + symbolWithNoSvg?.english}>{symbolWithNoSvg?.english}</span>
			);
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

	describe("getNewHighlightedItemsBasedOnMovement", () => {
		it("should hightlight the next item in the list when key is down", () => {
			const newHighlightIndex = getNewHightlightedItemBasedOnMovement(MoveKeys.DOWN, 0, 5);
			expect(newHighlightIndex).toEqual(1);
		});

		it("should hightlight the last item in the list when key is up and first item is already highlighted", () => {
			const newHighlightIndex = getNewHightlightedItemBasedOnMovement(MoveKeys.UP, 0, 5);
			expect(newHighlightIndex).toEqual(4);
		});

		it("should hightlight the first item in the list when key is down and last item is already highlighted", () => {
			const newHighlightIndex = getNewHightlightedItemBasedOnMovement(MoveKeys.DOWN, 4, 5);
			expect(newHighlightIndex).toEqual(0);
		});

		it("should move up one when the key is up and there are more items before highlighted item", () => {
			const newHighlightIndex = getNewHightlightedItemBasedOnMovement(MoveKeys.UP, 1, 5);
			expect(newHighlightIndex).toEqual(0);
		});
	});
});
