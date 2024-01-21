import { render } from "@testing-library/react";
import SymbolOptions from "./SymbolOptions";
import { itemsMock } from "@/tests/mocks/selectorListItem.mock";

describe("SymbolOptions", () => {
	it("should return null if passed text is empty", () => {
		const { baseElement } = render(<SymbolOptions text="" symbols={itemsMock} />);
		expect(baseElement?.nodeValue).toEqual(null);
	});
});
