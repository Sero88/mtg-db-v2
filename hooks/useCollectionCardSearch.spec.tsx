import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { getIdsFromQuantitiesResultMock } from "@/tests/mocks/collectionQuantity.mock";
import {
	elvishMysticCollectionVersion,
	nissaVastwoodSeerCollectionVersion,
	plusTwoMaceCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { useCollectionCardSearch } from "./useCollectionCardSearch";

const axiosSpy = jest.spyOn(axios, "post");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockIds = getIdsFromQuantitiesResultMock();

const searchFields = {
	cardName: "Elvish Mystic",
};

const resultsMock = [
	elvishMysticCollectionVersion,
	nissaVastwoodSeerCollectionVersion,
	plusTwoMaceCollectionVersion,
];
describe("useCollectionCardSearch", () => {
	beforeEach(() => {
		axiosSpy.mockResolvedValue({ data: { data: [elvishMysticCollectionVersion] } });
	});
	it("should call endpoint", async () => {
		const { result } = renderHook(() => useCollectionCardSearch(searchFields), {
			wrapper,
		});

		await waitFor(() => {
			result.current.refetch();
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith("/api/collection/search", searchFields);
	});

	it("should return list of cards", async () => {
		axiosSpy.mockResolvedValue({ data: { data: resultsMock } });
		const { result } = renderHook(() => useCollectionCardSearch(searchFields), {
			wrapper,
		});

		await waitFor(() => {
			result.current.refetch();
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(resultsMock);
	});
});
