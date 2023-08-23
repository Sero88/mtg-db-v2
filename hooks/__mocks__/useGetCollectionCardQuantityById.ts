import { getSetQuantityResultMock } from "@/tests/mocks/collectionQuantity.mock";

export async function useGetCollectionCardQuantityById() {
	return { data: { getSetQuantityResultMock } };
}
