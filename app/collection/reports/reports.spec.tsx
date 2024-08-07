import ReportsPage from "./page";
import { screen, render } from "@testing-library/react";
import * as UpdatePricesComponent from "@/components/reports/UpdatePrices";

jest.mock("@/components/reports/UpdatePrices", () => {
	const originalModule = jest.requireActual("@/components/reports/UpdatePrices");
	return {
		__esModule: true,
		...originalModule,
	};
});

const updatePricesSpy = jest.spyOn(UpdatePricesComponent, "UpdatePrices");

describe("/collection/search page", () => {
	it("should display header", () => {
		render(<ReportsPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should display quantity section", () => {
		render(<ReportsPage />);
		expect(screen.queryByText("Quantity Data:")).not.toBeNull();
	});

	it("should display price section", () => {
		render(<ReportsPage />);
		expect(screen.queryByText("Price Data:")).not.toBeNull();
	});

	it("should display UpdatePrices section", () => {
		render(<ReportsPage />);
		expect(updatePricesSpy).toHaveBeenCalled();
	});
});
