import ReportsPage from "./page";
import { screen, render } from "@testing-library/react";

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
});
