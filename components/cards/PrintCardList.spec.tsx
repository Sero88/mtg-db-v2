import { render, screen } from "@testing-library/react";
import * as PrintCardComponent from "@/components/cards/PrintCard";
import { printSearchMock, printSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { PrintCardList } from "./PrintCardList";
jest.mock("@/components/cards/PrintCard", () => {
	return {
		__esModule: true,
		...jest.requireActual("@/components/cards/PrintCard"),
	};
});

const printCardSpy = jest.spyOn(PrintCardComponent, "PrintCard");

describe("GeneralCardList component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should display card list", () => {
		render(<PrintCardList cardData={printSearchMock.data} />);
		const list = screen.queryByRole("list");

		expect(list).not.toBeNull();
	});

	it("should display cards using GeneralCardDetails", () => {
		render(<PrintCardList cardData={printSearchMock.data} />);
		expect(printCardSpy).toHaveBeenCalledTimes(printSearchMockResults.data.length);
	});
});
