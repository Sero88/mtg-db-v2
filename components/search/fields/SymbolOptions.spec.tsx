import { render, screen } from "@testing-library/react";
import { SymbolOptions } from "./SymbolOptions";
import { itemsMock } from "@/tests/mocks/selectorListItem.mock";

describe("SymbolOptions", () => {
	it("should return null if passed symbols is empty", () => {
		const { baseElement } = render(<SymbolOptions symbols={[]} highlightedOption={0} />);
		expect(baseElement?.nodeValue).toEqual(null);
	});
});
