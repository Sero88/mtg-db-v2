import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetCollectionCardQuantityById } from "./useGetCollectionCardQuantityById";
import { renderHook, waitFor } from "@testing-library/react";
import {
	cardsWithRegularAndFoilQuantities,
	getIdsFromQuantitiesResultMock,
} from "@/tests/mocks/collectionQuantity.mock";

const axiosSpy = jest.spyOn(axios, "get");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockIds = getIdsFromQuantitiesResultMock();

describe("useGetCollectionCardQuantityById", () => {
	beforeEach(() => {
		axiosSpy.mockResolvedValue({ data: { data: cardsWithRegularAndFoilQuantities } });
	});
	it("should call endpoint", async () => {
		const { result } = renderHook(() => useGetCollectionCardQuantityById(mockIds), {
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(
			"/api/collection/search/quantity-by-id?cardIds=" + JSON.stringify(mockIds)
		);
	});

	it("should return list of sets", async () => {
		const { result } = renderHook(() => useGetCollectionCardQuantityById(mockIds), {
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(cardsWithRegularAndFoilQuantities);
	});
});
