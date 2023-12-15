export type CollectionCard = {
	name: string;
	oracleId: string;
	colorIdentity: string[] | null; //cards always have a color identity, colorless = null (empty array on scryfall)
	types: string[];
	cardFaces: CollectionCardFace[];

	versions?: Version[]; //CollectionCardType will be usually queried with versions
	keywords?: string[]; //not all cards can have keywords it is an optional field
};

export type CollectionCardQuantity = {
	[CollectionCardQuantityTypeEnum.REGULAR]?: number;
	[CollectionCardQuantityTypeEnum.FOIL]?: number;
};

export enum CollectionCardQuantityTypeEnum {
	REGULAR = "regular",
	FOIL = "foil",
}

type ImageObject = {
	artist: string | null;
	imageUri: string | null;
};

interface VersionInterface {
	scryfallId: string;
	oracleId: string;
	isPromo: boolean;
	collectionNumber: string;
	rarity: string;
	prices: { regular: number | null; foil: number | null };
	set: string;
	images: ImageObject[]; //images object is required, but Scryfall marks artist and uri as nullable, so it will account for that

	promoTypes?: string[]; //promo types is optional since a card may not be a promo
}

export interface Version extends VersionInterface {
	quantity: { regular?: number; foil?: number }; //optional since we may or may not have of either type
}

export interface VersionQuery extends VersionInterface {
	"quantity.regular"?: number;
	"quantity.foil"?: number;
}

export type QuantityCardCollection = {
	scryfallId: string;
	quantity: CollectionCardQuantity;
};

export type CollectionCardFace = {
	manaValue: number | null; // not on scryfall, my own field:  mana value(aka cmc) field
	manaCost: string | null; // not to be confused with manaValue. ManaValue is the converted mana cost (mana value), while manaCost is the representation of how it can be casted: {2}{G}

	//optional values - depending on the type of card, these may or may not apply, thus optional
	oracleText?: string;
	power?: string;
	toughness?: string;
	loyalty?: string;
	flavorText?: string;
};

export enum CardCollectionMenuStatus {
	INITIAL,
	UPDATED,
	ERROR,
}

export enum CardCollectionVersion {
	PROMO,
	NO_PROMO,
}
