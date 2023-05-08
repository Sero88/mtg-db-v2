import { setsList } from "@/tests/mocks/setsList.mock";
import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetSets } from "./useGetSets";
import { renderHook, waitFor } from "@testing-library/react";

const axiosSpy = jest.spyOn(axios, "get");
axiosSpy.mockResolvedValue({ data: { data: setsList } });

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetSets", () => {
	it("should call sets api endpoint", async () => {
		const { result } = renderHook(() => useGetSets(), {
			wrapper,
		});

		await waitFor(() => result.current.isSuccess);

		expect(axiosSpy).toHaveBeenCalledWith("/api/scryfall/sets");
	});

	it("should return list of sets", async () => {
		const { result } = renderHook(() => useGetSets(), {
			wrapper,
		});

		await waitFor(() => result.current.isSuccess);

		expect(result.current.data).toEqual(setsList);
	});
});
