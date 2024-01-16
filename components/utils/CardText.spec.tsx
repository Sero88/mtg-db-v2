import { symbolsList } from "@/tests/mocks/symbolList.mock";
import { createSymbolsMapAndArray, symbolTranslation } from "./CardText";
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
					width={15}
					height={15}
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
});
