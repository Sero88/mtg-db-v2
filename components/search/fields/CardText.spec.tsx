import { SearchFields } from "@/types/search";
import { CardText } from "./CardText";
import { fireEvent, render, screen } from "@testing-library/react";
import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { symbolsList, symbolsMapAndArrayMock } from "@/tests/mocks/symbolList.mock";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import * as TranslatedCardTextComponent from "@/components/search/fields/TranslatedCardText";
import * as SymbolOptionsComponent from "@/components/search/fields/SymbolOptions";
import { ScryfallSymbol } from "@/types/scryfall";
import * as CardTextUtils from "@/components/utils/CardTextUtil";

jest.mock("@/components/search/fields/TranslatedCardText", () => {
	const originalModule = jest.requireActual("@/components/search/fields/TranslatedCardText");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/SymbolOptions", () => {
	const originalModule = jest.requireActual("@/components/search/fields/SymbolOptions");

	return {
		__esModule: true,
		...originalModule,
	};
});

const fieldData = {
	name: SearchFields.TEXT,
	value: "Card Value",
};

jest.mock("@/components/utils/SearchSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/SearchSelector");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/utils/CardTextUtil", () => {
	const originalModule = jest.requireActual("@/components/utils/CardTextUtil");

	return {
		__esModule: true,
		...originalModule,
	};
});

const changeHandler = jest.fn();

const searchSelectorSpy = jest.spyOn(SearchSelectorComponent, "SearchSelector");

const symbolsArray = [
	{ symbol: "{−}", svg_uri: "", english: "− planeswalker minus ability" },
	{ symbol: "{+}", svg_uri: "", english: "+ planeswalker plus ability" },
];

const symbolsMap = new Map([
	[symbolsArray[0].symbol, symbolsArray[0]],
	[symbolsArray[1].symbol, symbolsArray[1]],
]);

const translatedCardTextSpy = jest.spyOn(TranslatedCardTextComponent, "TranslatedCardText");
const symbolOptionsSpy = jest.spyOn(SymbolOptionsComponent, "SymbolOptions");
const createSymbolsMapAndArraySpy = jest.spyOn(CardTextUtils, "createSymbolsMapAndArray");

describe("CardText", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("should have label", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByText("Card Text")).not.toBeNull();
	});

	it("should display passed value", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByDisplayValue(fieldData.value)).not.toBeNull();
	});

	it("should run changeHandler when value is changed", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		fireEvent.change(input, { target: { value: "new name" } });

		expect(changeHandler).toHaveBeenCalled();
	});

	it("should assign name property", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		expect(input).toHaveProperty("name", fieldData.name);
	});

	it("should render SearchSelector", () => {
		render(
			<ScryfallSymbolDataProvider symbols={symbolsList}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		expect(searchSelectorSpy).toHaveBeenCalled();
	});

	it("should convert Scryfall symbols to array and map", () => {
		render(
			<ScryfallSymbolDataProvider symbols={symbolsList}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		expect(createSymbolsMapAndArraySpy).toHaveBeenCalledWith(symbolsList);
	});

	it("should run changeHandler when you pick an item from the search selector", () => {
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const itemFromSelector = screen.getByText("− planeswalker minus ability");

		fireEvent.click(itemFromSelector);

		expect(changeHandler).toHaveBeenCalledTimes(1);
	});

	it("should run render TranslatedCardText", () => {
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		expect(translatedCardTextSpy).toHaveBeenCalledWith(
			{
				textToTranslate: fieldData.value,
				symbols: symbolsMap,
			},
			{}
		);
	});

	it("should render symbol options when user has focus on field and opens a curly brace ({)", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "test {";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);
		fireEvent.change(field, { target: { value: input } });

		expect(symbolOptionsSpy).toHaveBeenCalledWith(
			{ symbols: symbolsMapAndArrayMock.symbolsArray, text: fieldData.value },
			{}
		);
	});

	it("should not render symbol options when user does not have focus on field", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "test {";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.change(field, { target: { value: input } });

		expect(symbolOptionsSpy).not.toHaveBeenCalled();
	});

	it("should stop rendering options when user focuses out of field", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "test {";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);
		fireEvent.change(field, { target: { value: input } });

		expect(symbolOptionsSpy).toHaveBeenCalledWith(
			{ symbols: symbolsMapAndArrayMock.symbolsArray, text: fieldData.value },
			{}
		);

		fireEvent.focusOut(field);
		expect(screen.queryByTestId("symbolOptions")).toBeNull();
	});
});
