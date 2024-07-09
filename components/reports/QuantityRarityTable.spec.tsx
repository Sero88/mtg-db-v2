import { reportDataMock } from "@/tests/mocks/reportData.mock";
import { QuantityRarityTable } from "./QuantityRarityTable";
import { screen, render } from "@testing-library/react";
import { CardRarityEnum } from "@/types/card";

describe("QuantityRarityTable", () => {
	it("should display all rarity data", () => {
		render(<QuantityRarityTable reportData={reportDataMock} />);
		const tableHeader = screen.getByTestId("tableHeaderRow");
		expect(tableHeader.childElementCount).toEqual(6);
	});
});
