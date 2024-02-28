import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import { CardTypes } from "./CardTypes";
import { SearchFields } from "@/types/search";
import { render } from "@testing-library/react";
import { CollectionTypesDataProvider } from "@/providers/CollectionCardTypeProvider";

jest.mock("@/components/utils/SearchSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/SearchSelector");

	return {
		__esModule: true,
		...originalModule,
	};
});

const fieldData = {
	name: SearchFields.TYPES,
	value: {
		items: [],
		allowPartials: false,
	},
};
const searchSelectorSpy = jest.spyOn(SearchSelectorComponent, "SearchSelector");
const typesMock = ["Elf", "Planeswalker"];

describe("CardTypes", () => {
	it("should display search selector", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} />
			</CollectionTypesDataProvider>
		);
		expect(searchSelectorSpy).toHaveBeenCalled();
	});
});
