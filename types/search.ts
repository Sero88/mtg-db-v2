export enum SearchFields {
	NAME = "cardName",
}

export enum ColorConditionals {
	exact,
	include,
	atLeast,
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
	queryKey: string; //same as object key, used to match the update
	items: SelectorListTypeItem[];
	conditionals: {
		allowPartials?: boolean;
	};
};

export type SelectorListTypeItem = {
	name: string;
	is: boolean;
	value: string;
	uri?: string;
};

export type ColorsSelectorType = {
	selected: string[];
	conditional: number;
};

export type RaritySelectorType = {
	selected: string[];
};

export type DisplayListItem = {
	name: string;
	uri?: string;
	value: string;
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
};
