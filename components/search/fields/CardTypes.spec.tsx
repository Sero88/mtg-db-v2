import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import * as IsNotSelectorComponent from "@/components/utils/IsNotSelector";
import { CardTypes } from "./CardTypes";
import { SearchFields } from "@/types/search";
import { fireEvent, render, screen } from "@testing-library/react";
import { CollectionTypesDataProvider } from "@/providers/CollectionCardTypeProvider";

jest.mock("@/components/utils/SearchSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/SearchSelector");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/utils/IsNotSelector", () => {
	const originalModule = jest.requireActual("@/components/utils/IsNotSelector");
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
const isNotSelectorSpy = jest.spyOn(IsNotSelectorComponent, "IsNotSelector");

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

	it("should display IsNotSelector", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} />
			</CollectionTypesDataProvider>
		);

		expect(isNotSelectorSpy).toHaveBeenCalled();
	});

	it("should add type to IsNotSelector if clicked", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} />
			</CollectionTypesDataProvider>
		);

		const elfType = screen.getByText("Elf");

		fireEvent.click(elfType);

		expect(screen.queryByTestId("Elf-isNotSelector")).not.toBeNull();
	});

	it("should not add item to IsNotSelector if it already has been added", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} />
			</CollectionTypesDataProvider>
		);

		const elfType = screen.getByText("Elf");

		//add one time
		fireEvent.click(elfType);
		//try to add again
		fireEvent.click(elfType);

		const isNotSelectorItem = screen.queryAllByTestId("Elf-isNotSelector");
		expect(isNotSelectorItem.length).toEqual(1);
	});
});
