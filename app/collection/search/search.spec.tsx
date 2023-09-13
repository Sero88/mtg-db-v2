import SearchPage from "./page";
import { screen, render } from "@testing-library/react";

describe("/collection/search page", () => {
	it("should display header", () => {
		render(<SearchPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});
});
