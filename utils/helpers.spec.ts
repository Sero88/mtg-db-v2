import { helpers } from "./helpers";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";

describe("util helpers", () => {
	describe("convertNameToHtmlId", () => {
		it("should replace empty spaces with -", () => {
			const id = helpers.convertNameToHtmlId("this is a test");
			expect(id).toEqual("this-is-a-test");
		});
	});

	describe("apiResponse", () => {
		it("should return object with success and data properties", () => {
			const response = helpers.apiResponse(false, []);
			expect(response).toEqual({ data: [], success: false });
		});

		it("should return data as undefined if data argument is not passed", () => {
			const response = helpers.apiResponse(false);
			expect(response).toEqual({ data: undefined, success: false });
		});
	});

	describe("mapIdWithQuantities", () => {
		it("should return map scryfallId => quantity", () => {
			const mappedQuantities = helpers.mapIdWithQuantities(cardsWithRegularAndFoilQuantities);

			expect(mappedQuantities.size).toEqual(cardsWithRegularAndFoilQuantities.length);
			expect(mappedQuantities.get(cardsWithRegularAndFoilQuantities[0].scryfallId)).toEqual(
				expect.objectContaining(cardsWithRegularAndFoilQuantities[0].quantity)
			);
		});
	});
});
