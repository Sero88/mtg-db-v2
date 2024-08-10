import { render, screen } from "@testing-library/react";
import { DisplayError } from "./DisplayError";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

describe("DisplayError Component", () => {
	const errorText = "test error";
	it("should display text passed", () => {
		render(<DisplayError errorMessage={errorText} />);
		expect(screen.queryByText(errorText)).not.toBeNull();
	});

	it("should display icon", () => {
		const { baseElement } = render(<DisplayError errorMessage={errorText} />);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faWarning.iconName}"`);
	});
});
