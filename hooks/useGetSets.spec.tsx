import { setsList } from "@/tests/mocks/setsList.mock";
import axios from "axios";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetSets } from "./useGetSets";
import { renderHook, waitFor } from "@testing-library/react";

const axiosSpy = jest.spyOn(axios, "get");
axiosSpy.mockResolvedValue({ data: { data: setsList } });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const setsEndpoint = "https://api.scryfall.com/sets";

describe("useGetSets", () => {
	it("should call sets api endpoint", async () => {
		const { result } = renderHook(() => useGetSets(), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(setsEndpoint);
	});

	it("should return list of sets", async () => {
		const { result } = renderHook(() => useGetSets(), {
			//@ts-ignore - this is correct based on documentation
			wrapper,
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data).toEqual(setsList);
	});
});
