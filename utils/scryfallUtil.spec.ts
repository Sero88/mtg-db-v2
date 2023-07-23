import { printSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { elvishMystic, nissaVastwoodSeer, priestOfTitania } from "@/tests/mocks/scryfallCard.mock";
import { ScryfallUtil } from "./scryfallUtil";

describe("util scryfall helpers", () => {
	describe("getCollectorsData", () => {
		it("should return object with number and type", () => {
			const collectorsData = ScryfallUtil.getCollectorsData(printSearchMockResults.data[0]);

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
			const collectorsNumber = ScryfallUtil.getCollectorsNumber(
				printSearchMockResults.data[0],
				"s"
			);
			expect(collectorsNumber).toEqual("169");
		});
	});

	describe("getCollectionType", () => {
		it("should return 'pre-release' when collection promo is 's'", () => {
			const collectionType = ScryfallUtil.getCollectionType("s");
			expect(collectionType).toEqual("pre-release");
		});

		it("should return 'promo' when collection promo is 'p'", () => {
			const collectionType = ScryfallUtil.getCollectionType("p");
			expect(collectionType).toEqual("promo");
		});
	});

	describe("getPromoString", () => {
		it("should extract promo string from collector's number suffix", () => {
			const promoString = ScryfallUtil.getPromoString(printSearchMockResults.data[0]);
			expect(promoString).toEqual("s");
		});

		it("should extract promo string from collector's number prefix", () => {
			const printMockPromo = { ...printSearchMockResults.data[0], collector_number: "p169" };

			const promoString = ScryfallUtil.getPromoString(printMockPromo);
			expect(promoString).toEqual("p");
		});

		it("should return empty string when collector number does not have promo string", () => {
			const printMockNoPromo = { ...printSearchMockResults.data[0], collector_number: "169" };
			const promoString = ScryfallUtil.getPromoString(printMockNoPromo);
			expect(promoString).toEqual("");
		});
	});

	describe("hasRegularVersion", () => {
		it("should return true when scryfall card has regular version", () => {
			const hasRegular = ScryfallUtil.hasRegularVersion(elvishMystic);

			expect(hasRegular).toEqual(true);
		});

		it("should return false when scryfall card only has foil version", () => {
			const hasRegular = ScryfallUtil.hasRegularVersion(nissaVastwoodSeer);

			expect(hasRegular).toEqual(false);
		});
	});

	describe("hasFoilVersion", () => {
		it("should return true when scryfall card has foil version", () => {
			const hasFoil = ScryfallUtil.hasFoilVersion(nissaVastwoodSeer);

			expect(hasFoil).toEqual(true);
		});

		it("should return false when scryfall card does not have foil version", () => {
			const hasFoil = ScryfallUtil.hasFoilVersion(priestOfTitania);

			expect(hasFoil).toEqual(false);
		});
	});
});
