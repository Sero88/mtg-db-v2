import { CardText } from "./CardText";
import { fireEvent, render, screen } from "@testing-library/react";
import { symbolsList, symbolsMapAndArrayMock } from "@/tests/mocks/symbolList.mock";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import { ScryfallSymbol } from "@/types/scryfall";
import * as CardTextUtils from "@/components/utils/CardTextUtil";
import { MoveKeys } from "@/types/cardText";
import { Config } from "@/config/main";
import React from "react";
import { CardColors } from "./CardColors";
import { SearchFieldNames } from "@/types/search";
import { ScryfallUtil } from "@/utils/scryfallUtil";

const changeHandler = jest.fn();
React.useContext = jest.fn().mockReturnValue(symbolsList);

const fieldData = {
	name: SearchFieldNames.COLORS,
	value: { selected: [] },
};

const colorSymbolsFromMock = ScryfallUtil.extractColorSymbols(symbolsList);

describe("CardColors", () => {
	it("should display all color/colorless symbols", () => {
		render(<CardColors fieldData={fieldData} changeHandler={changeHandler} />);

		const checkboxes = screen.queryAllByRole("checkbox");
		expect(checkboxes?.length).toEqual(colorSymbolsFromMock.length);
	});

	it("should uncheck color when colorless is clicked", () => {
		render(<CardColors fieldData={fieldData} changeHandler={changeHandler} />);

		const colorCheckbox = screen.queryByTestId("color-g") as HTMLInputElement;
		fireEvent.click(colorCheckbox);

		expect(colorCheckbox.checked).toEqual(true);

		const colorlessCheckbox = screen.queryByTestId("color-null") as HTMLInputElement;
		fireEvent.click(colorlessCheckbox);

		expect(colorlessCheckbox.checked).toEqual(true);
		expect(colorCheckbox.checked).toEqual(false);
	});

	it("should uncheck colorless when color is clicked", () => {
		render(<CardColors fieldData={fieldData} changeHandler={changeHandler} />);

		const colorlessCheckbox = screen.queryByTestId("color-null") as HTMLInputElement;
		fireEvent.click(colorlessCheckbox);

		expect(colorlessCheckbox.checked).toEqual(true);

		const colorCheckbox = screen.queryByTestId("color-g") as HTMLInputElement;
		fireEvent.click(colorCheckbox);

		expect(colorCheckbox.checked).toEqual(true);
		expect(colorlessCheckbox.checked).toEqual(false);
	});

	it("should display symbol images", () => {
		render(<CardColors fieldData={fieldData} changeHandler={changeHandler} />);
		const icons = screen.getAllByRole("img");
		expect(icons.length).toEqual(colorSymbolsFromMock.length);
	});
});
