import { render, screen } from "@testing-library/react";
import { SymbolOptions } from "./SymbolOptions";
import { itemsMock } from "@/tests/mocks/selectorListItem.mock";

describe("SymbolOptions", () => {
	it("should return null if passed text is empty", () => {
		const { baseElement } = render(<SymbolOptions text="" symbols={itemsMock} />);
		expect(baseElement?.nodeValue).toEqual(null);
	});

	it("should only show list that match the passed string", () => {
		const searchText = "testText";
		render(
			<SymbolOptions
				text={searchText}
				symbols={[...itemsMock, { display: searchText, value: searchText }]}
			/>
		);

		expect(screen.queryAllByText(/test [0-9]+/)).toEqual([]);
		expect(screen.queryByText(searchText)).not.toBeNull();
	});
});
