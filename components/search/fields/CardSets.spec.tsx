import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { SearchFieldNames } from "@/types/search";
import { fireEvent, render, screen } from "@testing-library/react";
import { CollectionTypesDataProvider } from "@/providers/CollectionCardTypeProvider";
import { CardSets } from "./CardSets";

jest.mock("@/components/utils/SearchSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/SearchSelector");

	return {
		__esModule: true,
		...originalModule,
	};
});

const setsMock = ["stx", "m20"];

const fieldData = {
	name: SearchFieldNames.SETS,
	value: [] as string[],
};
const searchSelectorSpy = jest.spyOn(SearchSelectorComponent, "SearchSelector");

const changeHandlerMock = jest.fn();

describe("CardTypes", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display search selector", () => {
		render(
			<CollectionTypesDataProvider types={setsMock}>
				<CardSets fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);
		expect(searchSelectorSpy).toHaveBeenCalled();
	});
});
