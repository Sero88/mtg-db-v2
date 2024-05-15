import { IsNotSelectorItem } from "./isNotSelector";

export interface SearchFields {
	[SearchFieldNames.NAME]: string;
	[SearchFieldNames.TEXT]: string;
	[SearchFieldNames.TYPES]: SelectorListType;
	[SearchFieldNames.COLORS]: ColorsSelectorType;
}
export enum SearchFieldNames {
	NAME = "cardName",
	TEXT = "cardText",
	TYPES = "cardTypes",
	COLORS = "cardColors",
	STATS = "cardStats",
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
	conditional: ColorConditionals;
	selected: string[];
};

export type RaritySelectorType = {
	selected: string[];
};

export type CardStatType = {
	type: string;
	conditional: StatConditionalEnums;
	value?: string;
};

export type SearchQueryFields = {
	cardName?: string;
	cardText?: string;
	cardTypes?: SelectorListType;
	cardColors?: ColorsSelectorType;
	cardStats?: CardStatType;
	cardSets?: SelectorListType;
	cardRarity?: RaritySelectorType;
};

export type SearchQuery = {
	$expr: { $eq: number[] };
	name?: RegExp;
	"cardFaces.oracleText"?: RegExp;
	types?: { $all?: string[]; $in?: string[]; $nin?: string[] };
	colorIdentity?: { $all?: string[]; $in?: string[]; $size?: number } | null;
};

export enum ColorConditionals {
	exact,
	include,
	atLeast,
}
