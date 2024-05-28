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
};
