import { selectedListMock } from "@/tests/mocks/selectedList.mock";
import { SelectedList } from "./SelectedList";
import { fireEvent, render, screen } from "@testing-library/react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const removeHandler = jest.fn();
describe("SelectedList", () => {
	it("should display all items in list", () => {
		render(<SelectedList list={selectedListMock} removeHandler={removeHandler} />);
		const list = screen.getByRole("list");
		expect(list.childNodes.length).toEqual(selectedListMock.length);
	});

	it("should display remove icon", () => {
		const { baseElement } = render(
			<SelectedList list={selectedListMock} removeHandler={removeHandler} />
		);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faClose.iconName}"`);
	});

	it("should run removeHandler item whenever remove icon is clicked", async () => {
		render(<SelectedList list={selectedListMock} removeHandler={removeHandler} />);
		const removeButton = await screen.findByTestId("remove-test");
		fireEvent.click(removeButton);

		expect(removeHandler).toHaveBeenCalled();
	});
});
