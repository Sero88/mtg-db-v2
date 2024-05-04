import { printSearchMockResults } from "@/tests/mocks/cardSearch.mock";
import { elvishMystic, nissaVastwoodSeer, priestOfTitania } from "@/tests/mocks/scryfallCard.mock";
import { ScryfallUtil } from "./scryfallUtil";
import { setsList } from "@/tests/mocks/setsList.mock";
import { symbolsList } from "@/tests/mocks/symbolList.mock";

describe("util scryfall helpers", () => {
	describe("getCollectorsData", () => {
		it("should return object with number and type", () => {
			const collectorsData = ScryfallUtil.getCollectorsData({
				...printSearchMockResults.data[0],
				collector_number: "169s",
			});

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
			const promoString = ScryfallUtil.getPromoString({
				...printSearchMockResults.data[0],
				collector_number: "169s",
			});
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

	describe("getCardTypes", () => {
		it("should return card types from ScryfallCard", () => {
			const types = ScryfallUtil.getCardTypes(nissaVastwoodSeer);

			expect(types).toEqual([
				"Legendary",
				"Creature",
				"Elf",
				"Scout",
				"Planeswalker",
				"Nissa",
			]);
		});
	});

	describe("isMultiface", () => {
		it("should return true when it is a multiface card", () => {
			expect(ScryfallUtil.isMultiface(nissaVastwoodSeer)).toEqual(true);
		});

		it("should return false when card is not multiface", () => {
			expect(ScryfallUtil.isMultiface(elvishMystic)).toEqual(false);
		});
	});

	describe("getImageFromSet", () => {
		it("should returns svg uri", () => {
			const image = ScryfallUtil.getImageFromSet(setsList, "tst");
			expect(image).toEqual(setsList[0].icon_svg_uri);
		});
	});

	describe("extractColorSymbols", () => {
		const expectedSymbols = [
			{ uri: "https://svgs.scryfall.io/card-symbols/G.svg", value: "g" },
			{ uri: "https://svgs.scryfall.io/card-symbols/G.svg", value: "null" },
		];

		test("it should return only color related symbols", () => {
			const colorSymbols = ScryfallUtil.extractColorSymbols(symbolsList);
			expect(colorSymbols).toEqual(expectedSymbols);
		});
	});
});
