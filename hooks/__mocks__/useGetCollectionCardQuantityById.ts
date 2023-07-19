import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";

export async function useGetCollectionCardQuantityById() {
	return { data: { cardsWithRegularAndFoilQuantities } };
}
