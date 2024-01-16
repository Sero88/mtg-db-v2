import { symbolsMap } from "@/tests/mocks/symbolList.mock";
import { TranslatedCardText } from "./TranslatedCardText";
import { render, screen } from "@testing-library/react";
import Image from "next/image";

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});
describe("TranslatedCardText Component", () => {
	it("should automatically replace card text symbols to images", () => {
		render(<TranslatedCardText symbols={symbolsMap} textToTranslate="This is a test {6}" />);

		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({
				src: symbolsMap.get("{6}").svg_uri,
			}),
			{}
		);
	});

	it("should display text as is when it is not a symbol", () => {
		const regularText = "this is regular text with no symbols";
		render(<TranslatedCardText symbols={symbolsMap} textToTranslate={`${regularText} {6}`} />);

		expect(screen.queryByText(regularText)).not.toBeNull();
	});
});
