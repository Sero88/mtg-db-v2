import { SearchFields } from "@/types/search";
import { CardText } from "./CardText";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { symbolsList } from "@/tests/mocks/symbolList.mock";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import * as TranslatedCardTextComponent from "@/components/search/fields/TranslatedCardText";
import { ScryfallSymbol } from "@/types/scryfall";

jest.mock("@/components/search/fields/TranslatedCardText", () => {
	const originalModule = jest.requireActual("@/components/search/fields/TranslatedCardText");

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

describe("CardText", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("should have label", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByText("Text")).not.toBeNull();
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

	it("should run changeHandler when you pick an item from the search selector", () => {
		render(
			<ScryfallSymbolDataProvider symbols={symbolsList}>
				<CardText fieldData={fieldData} changeHandler={changeHandler} />
			</ScryfallSymbolDataProvider>
		);

		const itemFromSelector = screen.getByText("six generic mana");

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
});
