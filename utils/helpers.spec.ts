import { printSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { helpers } from "./helpers";

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

	describe("getCollectorsData", () => {
		it("should return object with number and type", () => {
			const collectorsData = helpers.getCollectorsData(printSearchMockResults.data[0]);

			expect(collectorsData).toEqual(
				expect.objectContaining({
					number: "169",
					type: "pre-release",
				})
			);
		});
	});

	describe("getCollectorsNumber", () => {
		it("should return the collector's number without the promo postfix", () => {
			const collectorsNumber = helpers.getCollectorsNumber(
				printSearchMockResults.data[0],
				"s"
			);
			expect(collectorsNumber).toEqual("169");
		});
	});

	describe("getCollectionType", () => {
		it("should return 'pre-release' when collection promo is 's'", () => {
			const collectionType = helpers.getCollectionType("s");
			expect(collectionType).toEqual("pre-release");
		});

		it("should return 'promo' when collection promo is 'p'", () => {
			const collectionType = helpers.getCollectionType("p");
			expect(collectionType).toEqual("promo");
		});
	});

	describe("getCollectionPromoString", () => {
		it("should extract promo string from collector's number suffix", () => {
			const promoString = helpers.getCollectionPromoString(printSearchMockResults.data[0]);
			expect(promoString).toEqual("s");
		});

		it("should extract promo string from collector's number prefix", () => {
			const printMockPromo = { ...printSearchMockResults.data[0], collector_number: "p169" };

			const promoString = helpers.getCollectionPromoString(printMockPromo);
			expect(promoString).toEqual("p");
		});

		it("should return empty string when collector number does not have promo string", () => {
			const printMockNoPromo = { ...printSearchMockResults.data[0], collector_number: "169" };
			const promoString = helpers.getCollectionPromoString(printMockNoPromo);
			expect(promoString).toEqual("");
		});
	});
});
