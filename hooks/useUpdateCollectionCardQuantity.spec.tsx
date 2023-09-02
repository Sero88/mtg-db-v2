import axios from "axios";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { getSetQuantityResultMock } from "@/tests/mocks/collectionQuantity.mock";
import { useUpdateCollectionCardQuantity } from "./useUpdateCollectionCardQuantity";
import { nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";

const axiosSpy = jest.spyOn(axios, "patch");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactElement }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mocksetQuantityResult = getSetQuantityResultMock();
const mutateObject = {
	card: nissaVastwoodSeer,
	quantity: {
		[CollectionCardQuantityTypeEnum.REGULAR]: undefined,
		[CollectionCardQuantityTypeEnum.FOIL]: 4,
	},
	type: CollectionCardQuantityTypeEnum.FOIL,
};
describe("useUpdateCollectionCardQuantity", () => {
	beforeEach(() => {
		axiosSpy.mockResolvedValue({ data: { data: mocksetQuantityResult, success: true } });
	});
	it("should call endpoint", async () => {
		const { result } = renderHook(() => useUpdateCollectionCardQuantity(), {
			wrapper,
		});

		result.current.mutate(mutateObject);

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(axiosSpy).toHaveBeenCalledWith(
			"/api/collection/update/quantity",
			expect.objectContaining({
				...mutateObject,
			})
		);
	});
});
