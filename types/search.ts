import { IsNotSelectorItem } from "./isNotSelector";

export enum SearchFields {
	NAME = "cardName",
	TEXT = "cardText",
	TYPES = "cardTypes",
}

export enum StatConditionalEnums {
	eq,
	ne,
	gt,
	gte,
	lt,
	lte,
}

export type SelectorListType = {
	items: IsNotSelectorItem[];
	allowPartials: boolean;
};

export type ColorsSelectorType = {
	selected: string[];
	conditional: number;
};

export type RaritySelectorType = {
	selected: string[];
};

export type CardStatsType = {
	[key: string]: {
		type: string;
		conditional: StatConditionalEnums;
		value?: string;
	};
};

export type SearchQueryFields = {
	cardName?: string;
	cardText?: string;
	cardTypes?: SelectorListType;
	cardColors?: ColorsSelectorType;
	cardStats?: CardStatsType;
	cardSets?: SelectorListType;
	cardRarity?: RaritySelectorType;
};

export type SearchQuery = {
	$expr: { $eq: number[] };
	name?: RegExp;
	"cardFaces.oracleText"?: RegExp;
};
