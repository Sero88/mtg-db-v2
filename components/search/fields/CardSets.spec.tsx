import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { SearchFieldNames } from "@/types/search";
import { fireEvent, render, screen } from "@testing-library/react";
import { CardSets } from "./CardSets";
import * as SelectedListComponent from "@/components/utils/SelectedList";
import { CollectionSetsDataProvider } from "@/providers/CollectionSetProvider";
import { ScryfallSetDataProvider } from "@/providers/ScryfallSetDataProvider";
import { setsListForCardSets } from "@/tests/mocks/setsList.mock";
import { collectionSets } from "@/tests/mocks/collectionSets.mock";

jest.mock("@/components/utils/SearchSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/SearchSelector");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/utils/SelectedList", () => {
	const originalModule = jest.requireActual("@/components/utils/SelectedList");

	return {
		__esModule: true,
		...originalModule,
	};
});

const fieldData = {
	name: SearchFieldNames.SETS,
	value: [] as string[],
};
const searchSelectorSpy = jest.spyOn(SearchSelectorComponent, "SearchSelector");
const selectedListSpy = jest.spyOn(SelectedListComponent, "SelectedList");

const changeHandlerMock = jest.fn();

describe("CardSets", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display search selector", () => {
		render(
			<ScryfallSetDataProvider sets={setsListForCardSets}>
				<CollectionSetsDataProvider sets={collectionSets}>
					<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
				</CollectionSetsDataProvider>
			</ScryfallSetDataProvider>
		);
		expect(searchSelectorSpy).toHaveBeenCalled();
	});

	it("should display selected list", () => {
		render(
			<ScryfallSetDataProvider sets={setsListForCardSets}>
				<CollectionSetsDataProvider sets={collectionSets}>
					<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
				</CollectionSetsDataProvider>
			</ScryfallSetDataProvider>
		);
		expect(selectedListSpy).toHaveBeenCalled();
	});

	it("should add and remove set when set is clicked", () => {
		render(
			<ScryfallSetDataProvider sets={setsListForCardSets}>
				<CollectionSetsDataProvider sets={collectionSets}>
					<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
				</CollectionSetsDataProvider>
			</ScryfallSetDataProvider>
		);
		const sets = screen.getAllByRole("listitem");

		fireEvent.click(sets[0]);
		let selectedSet = screen.queryByTestId(`remove-${setsListForCardSets[0].code}`);
		expect(selectedSet).not.toBeNull();

		fireEvent.click(selectedSet!);
		selectedSet = screen.queryByTestId(`remove-${setsListForCardSets[0].code}`);
		expect(selectedSet).toBeNull();
	});

	it("should only add set once, no duplicates", () => {
		render(
			<ScryfallSetDataProvider sets={setsListForCardSets}>
				<CollectionSetsDataProvider sets={collectionSets}>
					<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
				</CollectionSetsDataProvider>
			</ScryfallSetDataProvider>
		);
		const sets = screen.getAllByRole("listitem");

		fireEvent.click(sets[0]);
		let selectedSet = screen.queryByTestId(`remove-${setsListForCardSets[0].code}`);
		expect(selectedSet).not.toBeNull();

		fireEvent.click(sets[0]);
		const selectedSets = screen.getAllByTestId(`remove-${setsListForCardSets[0].code}`);
		expect(selectedSets.length).toEqual(1);
	});

	it("should only display allowed sets", () => {
		render(
			<ScryfallSetDataProvider sets={setsListForCardSets}>
				<CollectionSetsDataProvider sets={collectionSets}>
					<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
				</CollectionSetsDataProvider>
			</ScryfallSetDataProvider>
		);

		const sets = screen.getAllByRole("listitem");
		expect(sets.length).toEqual(2);
	});
});
