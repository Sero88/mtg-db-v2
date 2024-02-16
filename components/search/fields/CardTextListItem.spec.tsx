import { render, screen } from "@testing-library/react";
import * as ImageNext from "next/image";
import { CardTextListItem } from "./CardTextListItem";
import { symbolsList } from "@/tests/mocks/symbolList.mock";
import Image from "next/image";

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

describe("CardTextListItem", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display image if symbol has one", () => {
		render(<CardTextListItem symbol={symbolsList[0]} />);
		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({
				src: symbolsList[0].svg_uri,
			}),
			{}
		);
	});

	it("should not display image if it is missing one", () => {
		render(<CardTextListItem symbol={{ ...symbolsList[0], svg_uri: "" }} />);
		expect(Image).not.toHaveBeenCalled();
	});

	it("should display symbol description", () => {
		render(<CardTextListItem symbol={symbolsList[0]} />);
		expect(screen.queryByText(symbolsList[0].english)).not.toBeNull();
	});
});
