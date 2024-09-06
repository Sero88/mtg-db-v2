import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { collectionVersionsMock } from "@/tests/mocks/collectionVersions.mock";
import { useGetCollectionData } from "./useGetCollectionData";
import { elvishMysticCollectionCardWithVersions } from "@/tests/mocks/collectionCard.mock";

const axiosSpy = jest.spyOn(axios, "get");

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const endpoint = "/api/collection/test";
const id = "testId";

describe("useGetCollectionData", () => {
	beforeEach(() => {
		axiosSpy.mockReset();
	});

	it("should throw error when data can't be fetched", async () => {
		axiosSpy.mockReset();
		axiosSpy.mockResolvedValue(undefined);
		axiosSpy.mockImplementation(() => {
			throw new Error("test");
		});

		const { result } = renderHook(() => useGetCollectionData(endpoint, id), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isError).toBe(true));

		expect(result.current.data).toEqual(undefined);
	});
	it("should call api endpoint", async () => {
		axiosSpy.mockResolvedValue({ data: { data: elvishMysticCollectionCardWithVersions } });
		const { result } = renderHook(() => useGetCollectionData(endpoint, id), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(endpoint);
	});

	it("should return data when successful", async () => {
		axiosSpy.mockResolvedValue({ data: { data: elvishMysticCollectionCardWithVersions } });
		const { result } = renderHook(() => useGetCollectionData(endpoint, id), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(elvishMysticCollectionCardWithVersions);
	});
});
