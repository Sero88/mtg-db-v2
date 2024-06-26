import { fireEvent, render, screen } from "@testing-library/react";
import { SearchSelector } from "./SearchSelector";
import { itemsMock } from "@/tests/mocks/selectorListItem.mock";

const clickHandler = jest.fn();

describe("SearchSelector", () => {
	it("should display search text", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		expect(screen.queryByRole("textbox")).not.toBeNull();
	});

	it("should clear search input text when search clear button is clicked", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const newInputValue = "test";
		const clearButton = screen.getByRole("button");
		const input = screen.getByRole("textbox") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "test" } });

		expect(input.value).toEqual(newInputValue);

		fireEvent.click(clearButton);

		expect(input.value).toEqual("");
	});

	it("should display all passed list items", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		expect(screen.queryAllByText(/^test[0-9]?/).length).toEqual(itemsMock.length);
	});

	it("should execute call clickHandler callback when item is clicked", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const item1 = screen.getByText(itemsMock[0].display);

		fireEvent.click(item1);

		expect(clickHandler).toHaveBeenCalledWith(itemsMock[0]);
	});

	it("should only show matching list items from search", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const input = screen.getByRole("textbox") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "test2" } });

		expect(screen.queryAllByText(/^test[0-9]?/).length).toEqual(1);
	});

	it("should escape items correctly", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const input = screen.getByRole("textbox") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "+test2" } });

		expect(screen.queryAllByText(/^test[0-9]?/).length).toEqual(1);
	});

	it("should use searchValue when passed", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const input = screen.getByRole("textbox") as HTMLInputElement;

		fireEvent.change(input, { target: { value: itemsMock[2].searchValue } });

		expect(screen.queryAllByText(itemsMock[2].display).length).toEqual(1);
	});

	it("search should not be case sensitive", () => {
		render(<SearchSelector items={itemsMock} clickHandler={clickHandler} />);
		const input = screen.getByRole("textbox") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "TEST2" } });

		expect(screen.queryAllByText(/^test[0-9]?/).length).toEqual(1);
	});
});
