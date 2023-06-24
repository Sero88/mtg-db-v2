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

	it("should display card prices", () => {
		render(<PrintCardDetails data={elvishMysticCardData} />);

		expect(screen.queryByText(/Reg:\s\$[0-9]+\.[0-9]+/)).not.toBeNull();
		expect(screen.queryByText(/Foil:\s\$[0-9]+\.[0-9]+/)).not.toBeNull();
	});

	it("should not display foil price if card does not have it", () => {
		const elvishMysticCardDataWithNoFoil = {
			...elvishMysticCardData,
			prices: { usd: "10.00", usd_foil: null },
		};

		render(<PrintCardDetails data={elvishMysticCardDataWithNoFoil} />);

		expect(screen.queryByText(/Reg:\s\$[0-9]+\.[0-9]+/)).not.toBeNull();
		expect(screen.queryByText(/Foil:\s\$[0-9]+\.[0-9]+/)).toBeNull();
	});
});
