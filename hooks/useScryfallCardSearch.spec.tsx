import { QueryClient, QueryClientProvider } from "react-query";
import { useScryfallCardSearch } from "./useScryfallCardSearch";
import { ReactElement } from "react";
import {
	generalSearchMockResults,
	generalSearchMockWithOneResults,
	printSearchMockResults,
} from "@/tests/mocks/cardSearch.mock";
import { makeGeneralSearch, makePrintSearch } from "@/utils/dataFetch/scryfallCardSearch";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";
import { renderHook, waitFor } from "@testing-library/react";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const args = {
	searchCardData: {
		cardName: "testName",
		setCode: "testSet",
	},
	page: 1,
};

jest.mock("@/utils/dataFetch/scryfallCardSearch");
const mockedGeneralSearch = jest.mocked(makeGeneralSearch);
mockedGeneralSearch.mockResolvedValue(generalSearchMockResults);

const mockedPrintSearch = jest.mocked(makePrintSearch);
mockedPrintSearch.mockResolvedValue(printSearchMockResults);

describe("useCardSearch() hook", () => {
	it("should return general search type and data", async () => {
		const { result } = renderHook(() => useScryfallCardSearch(args), {
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data?.resultsList).toEqual(generalSearchMockResults);
		expect(result.current.data?.type).toEqual(ScryfallResultsTypeEnum.GENERAL);
	});

	it("should return general print type and data", async () => {
		mockedGeneralSearch.mockResolvedValue(generalSearchMockWithOneResults);
		const { result } = renderHook(() => useScryfallCardSearch(args), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data?.type).toEqual(ScryfallResultsTypeEnum.PRINT);
		});

		expect(result.current.data?.resultsList).toEqual(printSearchMockResults);
	});
});
