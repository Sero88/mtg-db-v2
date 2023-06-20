import { render, screen } from "@testing-library/react";
import { PrintCardDetails } from "./PrintCardDetails";
import { printSearchMock } from "@/tests/mocks/cardSearch.mock";

const elvishMysticCardData = printSearchMock.data[0];
describe("PrintCardDetails component", () => {
	it("should display card name", () => {
		render(<PrintCardDetails data={elvishMysticCardData} />);
		expect(screen.queryByText(elvishMysticCardData.name)).not.toBeNull();
	});

	it("should display card set and number", () => {
		render(<PrintCardDetails data={elvishMysticCardData} />);
		const regex = new RegExp(`${elvishMysticCardData.set} \\S?[0-9]+\\S?`, "i");

		expect(screen.queryByText(regex)).not.toBeNull();
	});

	it("should display data set name", () => {
		render(<PrintCardDetails data={elvishMysticCardData} />);
		expect(screen.queryByText(elvishMysticCardData.set_name)).not.toBeNull();
	});
});
