import {
	generalSearchMockResults,
	noResultsMockSearch,
	printSearchMockResults,
} from "@/tests/mocks/cardSearch.mock";
import { ScryfallSearchResults } from "./ScryfallSearchResults";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";
import { render, screen } from "@testing-library/react";
import * as GeneralCardListComponent from "@/components/cards/GeneralCardList";
import * as PrintCardListComponent from "@/components/cards/PrintCardList";

jest.mock("@/components/cards/GeneralCardList", () => {
	const originalModule = jest.requireActual("@/components/cards/GeneralCardList");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/cards/PrintCardList", () => {
	const originalModule = jest.requireActual("@/components/cards/PrintCardList");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/hooks/useGetCollectionCardQuantityById.ts");

const clickHandler = jest.fn();
const generalCardListSpy = jest.spyOn(GeneralCardListComponent, "GeneralCardList");
const printCardListSpy = jest.spyOn(PrintCardListComponent, "PrintCardList");

describe("ScryfallSearchResults", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should display no cards message", () => {
		render(
			<ScryfallSearchResults
				cardData={{
					resultsList: noResultsMockSearch,
					type: ScryfallResultsTypeEnum.GENERAL,
				}}
				clickHandler={clickHandler}
			/>
		);

		expect(screen.queryByTestId("no-search-match")).not.toBeNull();
	});

	it("should display header for general results", () => {
		render(
			<ScryfallSearchResults
				cardData={{
					resultsList: generalSearchMockResults,
					type: ScryfallResultsTypeEnum.GENERAL,
				}}
				clickHandler={clickHandler}
			/>
		);

		expect(screen.queryByRole("heading", { level: 2 })).not.toBeNull();
	});

	it("should display header fron print results", () => {
		render(
			<ScryfallSearchResults
				cardData={{
					resultsList: printSearchMockResults,
					type: ScryfallResultsTypeEnum.PRINT,
				}}
				clickHandler={clickHandler}
			/>
		);

		expect(screen.queryByRole("heading", { level: 2 })).not.toBeNull();
	});

	it("should display matched card amount and GeneralCardList when results are of type general", () => {
		render(
			<ScryfallSearchResults
				cardData={{
					resultsList: generalSearchMockResults,
					type: ScryfallResultsTypeEnum.GENERAL,
				}}
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
		expect(printCardListSpy).not.toHaveBeenCalled();
	});

	it("should display PrintCardList and not GeneralCardList when results are of type PRINT", () => {
		render(
			<ScryfallSearchResults
				cardData={{
					resultsList: printSearchMockResults,
					type: ScryfallResultsTypeEnum.PRINT,
				}}
				clickHandler={clickHandler}
			/>
		);

		expect(generalCardListSpy).not.toHaveBeenCalled();
		expect(printCardListSpy).toHaveBeenCalled();
	});
});
