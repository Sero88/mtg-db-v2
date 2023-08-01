import AddPage from "./page";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { useScryfallCardSearch } from "@/hooks/useScryfallCardSearch";
import {
	generalSearchMockResults,
	noResultsMockSearch,
	printSearchMockResults,
} from "@/tests/mocks/cardSearch.mock";
import * as PaginationComponent from "@/components/utils/Pagination";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";
import * as ScryfallSearchResultsComponent from "@/components/scryfall/ScryfallSearchResults";

jest.mock("@/hooks/useScryfallCardSearch");
const useScryfallCardSearchMock = jest.mocked(useScryfallCardSearch);

jest.mock("@/components/utils/Pagination", () => {
	const originalModule = jest.requireActual("@/components/utils/Pagination");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/scryfall/ScryfallSearchResults", () => {
	const originalModule = jest.requireActual("@/components/scryfall/ScryfallSearchResults");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/hooks/useGetCollectionCardQuantityById.ts");

document.getElementById = jest.fn().mockImplementation(() => {});

const paginationSpy = jest.spyOn(PaginationComponent, "Pagination");
const scryfallSearchResultsSpy = jest.spyOn(
	ScryfallSearchResultsComponent,
	"ScryfallSearchResults"
);

const hookMockedData = {
	resultsList: generalSearchMockResults,
	type: ScryfallResultsTypeEnum.GENERAL,
};

describe("/collection/add page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should display header", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
		});

		render(<AddPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should display pagination when returned result data is of type: General", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		expect(paginationSpy).toHaveBeenCalled();
	});

	it("should display pagination when returned result data is of type: PRINT", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: { type: ScryfallResultsTypeEnum.PRINT, resultsList: printSearchMockResults },
		});

		render(<AddPage />);

		expect(paginationSpy).not.toHaveBeenCalled();
	});

	it("should not display pagination when returned result data is empty", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: { ...hookMockedData, resultsList: noResultsMockSearch },
		});

		render(<AddPage />);

		expect(paginationSpy).not.toHaveBeenCalled();
	});

	it("should display search results using ScryfallSearchResults", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		expect(scryfallSearchResultsSpy).toHaveBeenCalled();
	});

	it("should display loader while data is being fetched", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
		});

		render(<AddPage />);

		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should not display loader when data fetch is complete", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
		});

		render(<AddPage />);

		expect(screen.queryByTestId("loader")).toBeNull();
	});

	it("should display error when data fetch fails", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: true,
			data: undefined,
		});

		render(<AddPage />);

		expect(screen.queryByText(/Error:/)).not.toBeNull();
	});

	it("should not display error when data fetch is successful", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		expect(screen.queryByText(/Error:/)).toBeNull();
	});

	it("should not display back button when viewing general results", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		expect(screen.queryByTestId("backToList")).toBeNull();
	});

	it("should display back button when viewing print results from general results", async () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		const generalCard = await screen.findByText(hookMockedData.resultsList.data[0].name);

		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: {
				resultsList: printSearchMockResults,
				type: ScryfallResultsTypeEnum.PRINT,
			},
		});

		fireEvent.click(generalCard);

		expect(screen.queryByTestId("backToList")).not.toBeNull();
	});

	it("should not display back button when viewing print results directly from search", () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: {
				resultsList: printSearchMockResults,
				type: ScryfallResultsTypeEnum.PRINT,
			},
		});

		render(<AddPage />);

		expect(screen.queryByTestId("backToList")).toBeNull();
	});

	it("clicking back button should take user back to previous general results list", async () => {
		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		render(<AddPage />);

		const generalCard = await screen.findByText(hookMockedData.resultsList.data[0].name);

		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: {
				resultsList: printSearchMockResults,
				type: ScryfallResultsTypeEnum.PRINT,
			},
		});

		fireEvent.click(generalCard);

		const backButton = screen.getByTestId("backToList");

		//@ts-ignore
		useScryfallCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: hookMockedData,
		});

		fireEvent.click(backButton);

		await waitFor(() => {
			expect(screen.queryByText(hookMockedData.resultsList.data[1].name)).not.toBeNull();
		});
	});
});
