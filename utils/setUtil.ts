import { ScryfallSet } from "@/types/scryfall";
import { Config } from "@/config/main";

const officialSetCharLimit = 3; // official sets have 3 chars

export const SetUtil = {
	getCardSet: function (apiSet: string) {
		const set = apiSet.length > officialSetCharLimit ? apiSet.substring(1) : apiSet;
		return set;
	},

	isAllowedSet: function (set: ScryfallSet) {
		const isDigitalSetAllowed = !Config.allowDigitalSets && set.digital ? false : true;
		return isDigitalSetAllowed && Config.allowedSetTypes.includes(set.set_type);
	},

	//this removes promos such as 'pvow' and just shows the actual expansion: 'vow'
	isAllowedSearchSet: function (set: ScryfallSet) {
		return this.isAllowedSet(set) && set.code.length <= officialSetCharLimit;
	},

	getScryfallSetUsingCollectionSetCode(sets: ScryfallSet[], collectionSet: string) {
		// scryfall broke the 3 letter mtg set convetion, so some sets on scryfall have more than 3 letters such as hrt20
		// parent_set_code is set for scryfall sets such as promo and tokens, the parent is the set we want, so ignore the child
		// lastly, if none of the above worked, convert the set into three letters and check againts it

		return sets.find(
			(scryfallSet) =>
				scryfallSet.code == collectionSet ||
				(!scryfallSet.parent_set_code && this.getCardSet(scryfallSet.code) == collectionSet)
		);
	},
};
