import { selectedTypesMapMock } from "@/tests/mocks/cardTypes.mock";
import { IsNotSelector } from "./IsNotSelector";
import { fireEvent, render, screen } from "@testing-library/react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const updateTypesMock = jest.fn();
describe("isNotSelector component", () => {
	beforeEach(() => {});

	it("should display list of items", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		const list = screen.getByRole("list");
		expect(list.childNodes.length).toEqual(selectedTypesMapMock.size);
	});

	it("should display 'X' icon", () => {
		const { baseElement } = render(
			<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />
		);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faClose.iconName}"`);
	});

	it("should display IS when is prop is true", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		const listItem = screen.getByText("is");
		expect(listItem.parentElement?.textContent).toEqual("iself");
	});

	it("should display NOT when is prop is false", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		const listItem = screen.getByText("not");
		expect(listItem.parentElement?.textContent).toEqual("notplaneswalker");
	});

	it("should run updateTypes and remove item whenever remove icon is clicked", async () => {
		const selectedTypesToRemove = new Map(selectedTypesMapMock);
		render(<IsNotSelector items={selectedTypesToRemove} updateTypes={updateTypesMock} />);
		const removeButton = await screen.findByTestId("remove-elf");
		fireEvent.click(removeButton);

		expect(selectedTypesToRemove.get("elf")).toBeFalsy();
		expect(updateTypesMock).toHaveBeenCalled();
	});

	it("should change is value when is/not is clicked", () => {
		const selectedTypesToChange = new Map(selectedTypesMapMock);
		render(<IsNotSelector items={selectedTypesToChange} updateTypes={updateTypesMock} />);
		const isNotButton = screen.getByTestId("elf-isNot");
		fireEvent.click(isNotButton);

		expect(selectedTypesToChange.get("elf")?.is).toEqual(false);
		expect(updateTypesMock).toHaveBeenCalled();
	});

	it("should display item value", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		expect(screen.queryByText("elf")).not.toBeNull();
	});
});
