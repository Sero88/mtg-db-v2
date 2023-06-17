import { generalSearchMock, generalSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { GeneralCardList } from "./GeneralCardList";
import { render, screen } from "@testing-library/react";
import * as GeneralCardComponent from "@/components/cards/GeneralCard";

jest.mock("@/components/cards/GeneralCard", () => {
	return {
		__esModule: true,
		...jest.requireActual("@/components/cards/GeneralCard"),
	};
});

const GeneralCardSpy = jest.spyOn(GeneralCardComponent, "GeneralCard");

describe("GeneralCardList component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should display card list", () => {
		render(<GeneralCardList cardData={generalSearchMock.data} clickHandler={jest.fn()} />);
		const list = screen.queryByRole("list");

		expect(list).not.toBeNull();
	});

	it("should display cards using GeneralCard", () => {
		render(<GeneralCardList cardData={generalSearchMock.data} clickHandler={jest.fn()} />);
		expect(GeneralCardSpy).toHaveBeenCalledTimes(generalSearchMockResults.data.length);
	});
});
