import SearchPage from "./page";
import { screen, render, fireEvent } from "@testing-library/react";
import * as CardNameComponent from "@/components/search/fields/CardName";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";

jest.mock("@/components/search/fields/CardName", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardName");

	return {
		__esModule: true,
		...originalModule,
	};
});

const cardNameSpy = jest.spyOn(CardNameComponent, "CardName");

jest.mock("@/hooks/useCollectionCardSearch");
const useCollectionCardSearchMock = jest.mocked(useCollectionCardSearch);

const refetchMock = jest.fn();

describe("/collection/search page", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		useCollectionCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
			refetch: refetchMock,
			isSuccess: false,
		});
	});

	it("should display header", () => {
		render(<SearchPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should display CardName component", () => {
		render(<SearchPage />);
		expect(cardNameSpy).toHaveBeenCalled();
	});

	it("should fetch data when form is submitted", () => {
		render(<SearchPage />);
		const form = screen.getByTestId("searchForm");
		fireEvent.submit(form);
		expect(refetchMock).toHaveBeenCalled();
	});

	it("should not allow another submission when first submission is not complete", () => {
		useCollectionCardSearchMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
			refetch: refetchMock,
			isSuccess: false,
		});

		render(<SearchPage />);
		const form = screen.getByTestId("searchForm");
		fireEvent.submit(form);
		expect(refetchMock).not.toHaveBeenCalled();
	});

	// TODO: once I add more fields, I should prove that updating one field, shouldn't reset another
});
