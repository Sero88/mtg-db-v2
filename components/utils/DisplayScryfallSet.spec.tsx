import { setsListForCardSets } from "@/tests/mocks/setsList.mock";
import { DisplayScryfallSet } from "./DisplayScryfallSet";
import { collectionSets } from "@/tests/mocks/collectionSets.mock";
import { render, screen } from "@testing-library/react";
import Image from "next/image";

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});
describe("DisplayScryfallSet", () => {
	it("should show set icon", () => {
		render(<DisplayScryfallSet scryfallSet={setsListForCardSets[0]} set={collectionSets[0]} />);

		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ src: setsListForCardSets[0].icon_svg_uri }),
			{}
		);
	});

	it("should show set name", () => {
		render(<DisplayScryfallSet scryfallSet={setsListForCardSets[0]} set={collectionSets[0]} />);

		expect(screen.queryByText(setsListForCardSets[0].name)).not.toBeNull();
	});
});
