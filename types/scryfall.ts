export type ScryfallSet = {
	code: string;
	name: string;
	released_at: string;
	digital: boolean;
	set_type: string;
	icon_svg_uri: string;
	parent_set_code?: string;
};

export type ScryfallSearchCardData = {
	cardName: string;
	setCode: string;
};

export type ScryfallCard = {
	id: string; //unique to scryfall
	oracle_id: string; //unique to card on MTG's Oracle, but shares across same card name. So two cards across different sets have the same oracle_id
	name: string;
	color_identity: string[];
	keywords: string[];
	legalities: {};
	type_line: string;
	rarity: string;
	layout: string;
	collector_number: string;
	set: string;
	set_name: string;
	set_type: string;
	promo: boolean;
	prices: ScryfallCardPrices;
	finishes: string[];

	//can be missing or nullable
	mana_cost?: string;
	flavor_text?: string;
	loyalty?: number;
	oracle_text?: string;
	power?: string;
	toughness?: string;
	artist?: string;
	image_uris?: { small: string; normal: string };
	card_faces?: ScryfallCardFace[];
	promo_types?: string[];
};

export type ScryfallCardPrices = {
	usd: string | null;
	usd_foil: string | null;
};

export type ScryfallCardFace = {
	image_uris: { small: string; normal: string };
	mana_cost: string;
};

export enum ScryfallResultsTypeEnum {
	PRINT,
	GENERAL,
}
