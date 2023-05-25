import { DataError, ERROR_MESSAGE } from "./DataError";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("DataError Component", () => {
	it("should display error message", () => {
		render(<DataError />);

		expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
	});
});
