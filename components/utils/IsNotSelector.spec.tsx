import { selectedTypesMapMock } from "@/tests/mocks/cardTypes.mock";
import { IsNotSelector } from "./IsNotSelector";
import { render, screen } from "@testing-library/react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const updateTypesMock = jest.fn();
describe("isNotSelector component", () => {
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
		const listItem = screen.getByText("IS");
		expect(listItem.parentElement?.textContent).toEqual("ISelf");
	});

	it("should display NOT when is prop is false", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		const listItem = screen.getByText("NOT");
		expect(listItem.parentElement?.textContent).toEqual("NOTplaneswalker");
	});

	it("should display item value", () => {
		render(<IsNotSelector items={selectedTypesMapMock} updateTypes={updateTypesMock} />);
		expect(screen.queryByText("elf")).not.toBeNull();
	});
});
