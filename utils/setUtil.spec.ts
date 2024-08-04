import { scryfallSetsMock } from "@/tests/mocks/scryfallSets.mock";
import { setsList } from "../tests/mocks/setsList.mock";
import { SetUtil } from "./setUtil";

describe("SetUtil", () => {
	describe("isAllowedSearchSet", () => {
		it("should return true when set is allowed", async () => {
			const isAllowed = SetUtil.isAllowedSearchSet(setsList[0]);
			expect(isAllowed).toEqual(true);
		});

		it("should return false when set is not allowed", async () => {
			const isAllowed = SetUtil.isAllowedSearchSet(setsList[2]);
			expect(isAllowed).toEqual(false);
		});
	});

	describe("getCardSet", () => {
		it("should trim the set name if it is longer thatn the official set char limit (3)", () => {
			const cardSet = SetUtil.getCardSet("pTST");
			expect(cardSet).toEqual("TST");
		});

		it("should return the same set name if it not longer than limit", () => {
			const cardSet = SetUtil.getCardSet("TST");
			expect(cardSet).toEqual("TST");
		});
	});

	describe("getScryfallSetUsingCollectionSetCode", () => {
		const sets = [
			["c19", "c19"],
			["f20", "af20"], //(in this case expected is 'af20' because scryfall broke 3 set code limit)
		];
		test.each(sets)("should return %p, %p", (input, expected) => {
			const scryfallSet = SetUtil.getScryfallSetUsingCollectionSetCode(
				scryfallSetsMock,
				input
			);
			expect(scryfallSet?.code).toEqual(expected);
		});
	});
});
