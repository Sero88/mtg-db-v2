import { CollectionCardHelper } from "./collectionCardHelper";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";

describe("CollectionCardHelper", () => {
	describe("mapIdWithQuantities", () => {
		it("should return map scryfallId => quantity", () => {
			const mappedQuantities = CollectionCardHelper.mapIdWithQuantities(
				cardsWithRegularAndFoilQuantities
			);

			expect(mappedQuantities.size).toEqual(cardsWithRegularAndFoilQuantities.length);
			expect(mappedQuantities.get(cardsWithRegularAndFoilQuantities[0].scryfallId)).toEqual(
				expect.objectContaining(cardsWithRegularAndFoilQuantities[0].quantity)
			);
		});
	});
});
