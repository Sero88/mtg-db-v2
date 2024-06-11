import { setsListForCardSets } from "@/tests/mocks/setsList.mock";
import { createSetsArray } from "./CardSetUtil";
import { collectionSets } from "@/tests/mocks/collectionSets.mock";

describe("CardSetUtil", () => {
	describe("createSetsArray", () => {
		it("should return array of SelectorListItem", () => {
			const selectorListItemArray = createSetsArray(setsListForCardSets, collectionSets);

			expect(selectorListItemArray[0]).toEqual(
				expect.objectContaining({
					display: <p>{setsListForCardSets[0].name}</p>,
					value: setsListForCardSets[0].code,
					searchValue: setsListForCardSets[0].name,
				})
			);
		});
	});
});
