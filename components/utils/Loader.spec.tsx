import { queryByTestId, render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
	it("should display loader", () => {
		render(<Loader />);

		expect(screen.queryByTestId("loader")).not.toBeNull();
	});
});
