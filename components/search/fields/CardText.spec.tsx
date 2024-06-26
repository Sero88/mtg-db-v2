import { SearchFieldNames } from "@/types/search";
import { CardText } from "./CardText";
import { fireEvent, render, screen } from "@testing-library/react";
import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { symbolsList, symbolsMapAndArrayMock } from "@/tests/mocks/symbolList.mock";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import * as TranslatedCardTextComponent from "@/components/search/fields/TranslatedCardText";
import * as SymbolOptionsComponent from "@/components/search/fields/SymbolOptions";
import { ScryfallSymbol } from "@/types/scryfall";
import * as CardTextUtils from "@/components/utils/CardTextUtil";
import { MoveKeys } from "@/types/cardText";
import { Config } from "@/config/main";

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
	name: SearchFieldNames.TEXT,
	value: "ability",
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

const symbolsArray = Config.customCardTextSymbols as ScryfallSymbol[];

const symbolsMap = new Map([
	[symbolsArray[0].symbol, symbolsArray[0]],
	[symbolsArray[1].symbol, symbolsArray[1]],
]);

const translatedCardTextSpy = jest.spyOn(TranslatedCardTextComponent, "TranslatedCardText");
const symbolOptionsSpy = jest.spyOn(SymbolOptionsComponent, "SymbolOptions");
const createSymbolsMapAndArraySpy = jest.spyOn(CardTextUtils, "createSymbolsMapAndArray");
const getNewHightlightedItemBasedOnMovementSpy = jest.spyOn(
	CardTextUtils,
	"getNewHightlightedItemBasedOnMovement"
);

describe("CardText", () => {
	beforeEach(() => {
		jest.clearAllMocks();
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
		const input = "{";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);
		fireEvent.change(field, { target: { value: input } });

		expect(symbolOptionsSpy).toHaveBeenCalledWith(
			{ symbols: symbolsMapAndArrayMock.symbolsArray, highlightedOption: 0 },
			{}
		);
	});

	it("should replace search text with symbol when user hits enter to select option", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "{minus";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);
		fireEvent.change(field, { target: { value: input } });
		fireEvent.keyDown(field, { key: "Enter", code: "Enter", charCode: 13 });

		expect(changeHandler).toHaveBeenCalledWith("−");
	});

	it("should get the new highlighted index when user presses move key", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "{";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);
		fireEvent.change(field, { target: { value: input } });
		fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });

		expect(getNewHightlightedItemBasedOnMovementSpy).toHaveBeenCalledWith(MoveKeys.DOWN, 0, 2);
	});

	it("should always hightlight the first option when the symbol options list changes", () => {
		createSymbolsMapAndArraySpy.mockReturnValue(symbolsMapAndArrayMock);
		const input = "{";
		render(
			<ScryfallSymbolDataProvider symbols={symbolsArray as ScryfallSymbol[]}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const field = screen.getByTestId("cardTextArea");

		fireEvent.focusIn(field);

		fireEvent.change(field, { target: { value: input } });
		expect(screen.queryByTestId("active-hightlight-0")).not.toBeNull();

		fireEvent.keyDown(field, { key: "ArrowDown", code: "ArrowDown" });
		expect(screen.queryByTestId("active-hightlight-1")).not.toBeNull();

		fireEvent.change(field, { target: { value: "{minus" } });
		expect(screen.queryByTestId("active-hightlight-0")).not.toBeNull();
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
			{ symbols: symbolsMapAndArrayMock.symbolsArray, highlightedOption: 0 },
			{}
		);

		fireEvent.focusOut(field);
		expect(screen.queryByTestId("symbolOptions")).toBeNull();
	});
});
