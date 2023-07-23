import { CollectionCardUtil } from "./collectionCardUtil";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";

describe("CollectionCardUtil", () => {
	describe("mapIdWithQuantities", () => {
		it("should return map scryfallId => quantity", () => {
			const mappedQuantities = CollectionCardUtil.mapIdWithQuantities(
				cardsWithRegularAndFoilQuantities
			);

			expect(mappedQuantities.size).toEqual(cardsWithRegularAndFoilQuantities.length);
			expect(mappedQuantities.get(cardsWithRegularAndFoilQuantities[0].scryfallId)).toEqual(
				expect.objectContaining(cardsWithRegularAndFoilQuantities[0].quantity)
			);
		});
	});
});
