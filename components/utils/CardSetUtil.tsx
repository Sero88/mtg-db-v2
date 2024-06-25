import { ScryfallSet } from "@/types/scryfall";
import { SelectorListItem } from "@/types/searchSelector";
import { SetUtil } from "@/utils/setUtil";
import { DisplayScryfallSet } from "./DisplayScryfallSet";

export function createSetsArray(scryfallSets: ScryfallSet[], collectionSets: string[]) {
	const searchSetSelectorList = [] as SelectorListItem[];
	for (const scryfallSet of scryfallSets) {
		if (searchSetSelectorList.length == collectionSets.length) {
			break;
		}

		if (!SetUtil.isAllowedSet(scryfallSet)) {
			continue;
		}

		collectionSets.forEach((set: string) => {
			// scryfall broke the 3 letter mtg set convetion, so some sets on scryfall have more than 3 letters such as hrt20
			// parent_set_code is set for scryfall sets such as promo and tokens, the parent is the set we want, so ignore the child
			// lastly, if none of the above worked, convert the set into three letters and check againts it
			if (
				scryfallSet.code == set ||
				(!scryfallSet.parent_set_code && SetUtil.getCardSet(scryfallSet.code) == set)
			) {
				searchSetSelectorList.push({
					display: <DisplayScryfallSet scryfallSet={scryfallSet} />,
					value: set,
					searchValue: scryfallSet.name,
				});
			}
		});
	}
	return searchSetSelectorList;
}
