import {
	generalSearchMockResults,
	noResultsMockSearch,
	printSearchMockResults,
} from "@/tests/mocks/cardSearch.mock";
import { ScryfallSearchResults } from "./ScryfallSearchResults";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";
import { render, screen } from "@testing-library/react";
import * as GeneralCardListComponent from "@/components/cards/GeneralCardList";

jest.mock("@/components/cards/GeneralCardList", () => {
	const originalModule = jest.requireActual("@/components/cards/GeneralCardList");

	return {
		__esModule: true,
		...originalModule,
	};
});

const clickHandler = jest.fn();
const generalCardListSpy = jest.spyOn(GeneralCardListComponent, "GeneralCardList");

describe("ScryfallSearchResults", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should display no cards message", () => {
		render(
			<ScryfallSearchResults
				cardData={{ data: noResultsMockSearch, type: ScryfallResultsTypeEnum.GENERAL }}
				clickHandler={clickHandler}
			/>
		);

		expect(screen.queryByTestId("no-search-match")).not.toBeNull();
	});

	it("should display header", () => {
		render(
			<ScryfallSearchResults
				cardData={{ data: generalSearchMockResults, type: ScryfallResultsTypeEnum.GENERAL }}
				clickHandler={clickHandler}
			/>
		);

		expect(screen.queryByRole("heading", { level: 2 })).not.toBeNull();
	});

	it("should display matched card amount and GeneralCardList when results are of type general", () => {
		render(
			<ScryfallSearchResults
				cardData={{ data: generalSearchMockResults, type: ScryfallResultsTypeEnum.GENERAL }}
				clickHandler={clickHandler}
			/>
		);

		expect(generalCardListSpy).toHaveBeenCalledWith(
			{
				cardData: generalSearchMockResults.data,
				clickHandler,
			},
			{} //no children
		);

		expect(screen.queryByTestId("search-matched")).not.toBeNull();
	});

	it("should not display GeneralCardList when results are not of type general", () => {
		render(
			<ScryfallSearchResults
				cardData={{ data: printSearchMockResults, type: ScryfallResultsTypeEnum.PRINT }}
				clickHandler={clickHandler}
			/>
		);

		expect(generalCardListSpy).not.toHaveBeenCalled();
	});
});
