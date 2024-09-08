import { IsNotSelectorItem } from "./isNotSelector";

export interface SearchFields {
	[SearchFieldNames.NAME]?: string;
	[SearchFieldNames.TEXT]?: string;
	[SearchFieldNames.TYPES]?: SelectorListType;
	[SearchFieldNames.COLORS]?: ColorsSelectorType;
	[SearchFieldNames.STATS]?: CardStatType[];
	[SearchFieldNames.SETS]?: string[];
	[SearchFieldNames.RARITY]?: number[];
	[SearchFieldNames.ORACLEID]?: string[];
}
export enum SearchFieldNames {
	NAME = "cardName",
	TEXT = "cardText",
	TYPES = "cardTypes",
	COLORS = "cardColors",
	STATS = "cardStats",
	SETS = "cardSets",
	RARITY = "cardRarity",
	ORACLEID = "oracleId",
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

export type CardStatType = {
	name: string;
	conditional: StatConditionalEnums;
	value?: string;
};

export type SearchQuery = {
	$expr: { $eq: number[] };
	name?: RegExp;
	"cardFaces.oracleText"?: RegExp;
	types?: { $all?: string[]; $in?: string[]; $nin?: string[] };
	colorIdentity?: { $all?: string[]; $in?: string[]; $size?: number } | null;
	oracleId?: { $in: string[] };
};

export type SetsQuery = {
	$expr?: { $eq: number[] };
	"versions.set"?: { $in: string[] };
};

export type RarityQuery = {
	$expr?: { $eq: number[] };
	"versions.rarity"?: { $in: string[] };
};

export enum ColorConditionals {
	exact,
	include,
	atLeast,
}
