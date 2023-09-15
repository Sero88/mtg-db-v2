import SearchPage from "./page";
import { screen, render } from "@testing-library/react";
import * as CardNameComponent from "@/components/search/fields/CardName";

jest.mock("@/components/search/fields/CardName", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardName");

	return {
		__esModule: true,
		...originalModule,
	};
});

const cardNameSpy = jest.spyOn(CardNameComponent, "CardName");

describe("/collection/search page", () => {
	it("should display header", () => {
		render(<SearchPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should display CardName component", () => {
		render(<SearchPage />);
		expect(cardNameSpy).toHaveBeenCalled();
	});
});
