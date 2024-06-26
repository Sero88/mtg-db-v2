import * as SearchSelectorComponent from "@/components/utils/SearchSelector";
import * as IsNotSelectorComponent from "@/components/utils/IsNotSelector";
import { CardTypes } from "./CardTypes";
import { SearchFieldNames } from "@/types/search";
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
	name: SearchFieldNames.TYPES,
	value: {
		items: [],
		allowPartials: false,
	},
};
const searchSelectorSpy = jest.spyOn(SearchSelectorComponent, "SearchSelector");
const isNotSelectorSpy = jest.spyOn(IsNotSelectorComponent, "IsNotSelector");

const typesMock = ["Elf", "Planeswalker"];
const changeHandlerMock = jest.fn();

describe("CardTypes", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display search selector", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);
		expect(searchSelectorSpy).toHaveBeenCalled();
	});

	it("should display IsNotSelector", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);

		expect(isNotSelectorSpy).toHaveBeenCalled();
	});

	it("should add type to IsNotSelector if clicked", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);

		const elfType = screen.getByText("Elf");

		fireEvent.click(elfType);

		expect(screen.queryByTestId("Elf-isNotSelector")).not.toBeNull();
		expect(changeHandlerMock).toHaveBeenCalled();
	});

	it("should not add item to IsNotSelector if it already has been added", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);

		const elfType = screen.getByText("Elf");

		//add one time
		fireEvent.click(elfType);
		//try to add again
		fireEvent.click(elfType);

		const isNotSelectorItem = screen.queryAllByTestId("Elf-isNotSelector");
		expect(isNotSelectorItem.length).toEqual(1);
		expect(changeHandlerMock).toHaveBeenCalledTimes(1);
	});

	it("should remove item when remove icon is clicked for selected item", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);

		const elfType = screen.getByText("Elf");
		fireEvent.click(elfType);

		const removeButton = screen.getByTestId("remove-Elf");
		fireEvent.click(removeButton);

		expect(screen.queryByTestId("Elf-isNotSelector")).toBeNull();
		expect(changeHandlerMock).toHaveBeenCalled();
	});

	it("should display exact types checkbox and should be clickable", () => {
		render(
			<CollectionTypesDataProvider types={typesMock}>
				<CardTypes fieldData={fieldData} changeHandler={changeHandlerMock} />
			</CollectionTypesDataProvider>
		);

		const checkbox = screen.getByRole("checkbox", {
			name: "Allow partial types (search will use OR instead of AND)",
		}) as HTMLInputElement;

		expect(checkbox.checked).toEqual(false);

		fireEvent.click(checkbox);

		expect(checkbox.checked).toEqual(true);
	});
});
