import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetCollectionWithVersions } from "./useGetCollectionWithVersions";
import {
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCardWithVersion,
} from "@/tests/mocks/collectionCard.mock";

const collectionMock = [
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCardWithVersion,
];
const axiosSpy = jest.spyOn(axios, "get");
axiosSpy.mockResolvedValue({ data: { data: collectionMock } });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const endpoint = "/api/collection";
const newDate = new Date();

describe("useGetCollectionWithVersions", () => {
	it("should call api endpoint", async () => {
		const { result } = renderHook(() => useGetCollectionWithVersions(newDate), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(endpoint);
	});

	it("should return cards with versions", async () => {
		const { result } = renderHook(() => useGetCollectionWithVersions(newDate), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(collectionMock);
	});

	it("should not fetch data when date is not passed", async () => {
		const { result } = renderHook(() => useGetCollectionWithVersions(undefined), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.status).toBe("idle"));

		expect(result.current.data).toEqual(undefined);
	});
});
