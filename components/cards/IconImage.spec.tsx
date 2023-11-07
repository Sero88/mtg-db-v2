import { CardType } from "@/types/card";
import { CardImage } from "./CardImage";
import { render } from "@testing-library/react";
import Image from "next/image";
import { IconImage } from "./IconImage";

const imageUri =
	"https://cards.scryfall.io/normal/front/f/2/f2a26496-b4c9-4a29-9a85-26e217deafa2.jpg?1562943762";
const name = "cardName";

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

describe("IconImage component", () => {
	it("should have correct src", () => {
		render(<IconImage uri={imageUri} />);

		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ src: imageUri }),
			{} //children should be empty
		);
	});

	it("should have correct width and height", () => {
		render(<IconImage uri={imageUri} />);

		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ width: 15, height: 15 }),
			{} //children should be empty
		);
	});

	it("should not be optimized", () => {
		render(<IconImage uri={imageUri} />);

		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ unoptimized: true }),
			{} //children should be empty
		);
	});
});
