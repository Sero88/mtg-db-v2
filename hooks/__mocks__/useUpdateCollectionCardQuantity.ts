import { getSetQuantityResultMock } from "@/tests/mocks/collectionQuantity.mock";

export async function useUpdateCollectionCardQuantity() {
	const mutateFunction = () => {
		return { data: { getSetQuantityResultMock } };
	};

	return mutateFunction;
}
