import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

const itemsInfo = {
	amountPerPage: 10,
	totalItems: 88,
	hasMore: true,
};
const updateHandler = jest.fn();

describe("Pagination", () => {
	it("should display correct amount of pages", () => {
		render(<Pagination itemsInfo={itemsInfo} updateHandler={updateHandler} currentPage={1} />);
		expect(screen.queryAllByText(/[0-9]/).length).toEqual(9);
	});
	it("should run updateHandler when page item is clicked", () => {
		render(<Pagination itemsInfo={itemsInfo} updateHandler={updateHandler} currentPage={1} />);
		fireEvent.click(screen.getByText("1"));

		expect(updateHandler).toHaveBeenCalled();
	});

	it("should match page quantity to current page if hasMore is false", () => {
		const modifiedItemsInfo = {
			...itemsInfo,
			amountPerPage: 8,
			hasMore: false,
		};

		const currentPage = 9;
		render(
			<Pagination
				itemsInfo={modifiedItemsInfo}
				updateHandler={updateHandler}
				currentPage={currentPage}
			/>
		);

		expect(screen.queryAllByText(/[0-9]/).length).toEqual(currentPage);
	});
});
