import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetCollectionVersions } from "./useGetCollectionWithVersions";
import { collectionVersionsMock } from "@/tests/mocks/collectionVersions.mock";

const axiosSpy = jest.spyOn(axios, "get");
axiosSpy.mockResolvedValue({ data: { data: collectionVersionsMock } });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const endpoint = "/api/collection/versions";
const newDate = new Date();

describe("useGetCollectionVersions", () => {
	it("should call api endpoint", async () => {
		const { result } = renderHook(() => useGetCollectionVersions(newDate), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(endpoint);
	});

	it("should return versions", async () => {
		const { result } = renderHook(() => useGetCollectionVersions(newDate), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(collectionVersionsMock);
	});

	it("should not fetch data when date is not passed", async () => {
		const { result } = renderHook(() => useGetCollectionVersions(undefined), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.status).toBe("idle"));

		expect(result.current.data).toEqual(undefined);
	});
});
