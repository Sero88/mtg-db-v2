import { render, screen } from "@testing-library/react";
import * as PrintCardComponent from "@/components/cards/PrintCard";
import { printSearchMock, printSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { PrintCardList } from "./PrintCardList";

import * as useGetCollectionCardQuantityById from "@/hooks/useGetCollectionCardQuantityById";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";

jest.mock("@/components/cards/PrintCard", () => {
	return {
		__esModule: true,
		...jest.requireActual("@/components/cards/PrintCard"),
	};
});

const printCardSpy = jest.spyOn(PrintCardComponent, "PrintCard");

jest.mock("@/hooks/useGetCollectionCardQuantityById.ts", () => {
	return {
		__esModule: true,
		...jest.requireActual("@/hooks/useGetCollectionCardQuantityById.ts"),
	};
});

const collectionCardQuantityByIdSpy = jest.spyOn(
	useGetCollectionCardQuantityById,
	"useGetCollectionCardQuantityById"
);

jest.mock("@/hooks/useUpdateCollectionCardQuantity");

describe("PrintCardList component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		//@ts-ignore
		collectionCardQuantityByIdSpy.mockImplementation(() => ({
			isLoading: false,
			data: cardsWithRegularAndFoilQuantities,
		}));
	});

	it("should display card list", () => {
		render(<PrintCardList cardData={printSearchMock.data} />);
		const list = screen.queryByTestId("printCardList");

		expect(list).not.toBeNull();
	});

	it("should display cards using PrintCard", () => {
		render(<PrintCardList cardData={printSearchMock.data} />);
		expect(printCardSpy).toHaveBeenCalledTimes(printSearchMockResults.data.length);
	});

	it("should display loader when getting quantities", () => {
		//@ts-ignore
		collectionCardQuantityByIdSpy.mockImplementation(() => ({
			isLoading: true,
			data: undefined,
		}));

		render(<PrintCardList cardData={printSearchMock.data} />);
		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should not display loader when it is done retrieving quantities query", () => {
		render(<PrintCardList cardData={printSearchMock.data} />);
		expect(screen.queryByTestId("loader")).toBeNull();
	});
});
