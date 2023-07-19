export type CardQuantity = {
	[CollectionCardQuantityTypeEnum.REGULAR]?: number;
	[CollectionCardQuantityTypeEnum.FOIL]?: number;
};

export enum CollectionCardQuantityTypeEnum {
	REGULAR = "regular",
	FOIL = "foil",
}

export type DisplayListItem = {
	name: string;
	uri?: string;
	value: string;
};

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

export type QuantityCardCollection = {
	scryfallId: string;
	quantity: CardQuantity;
};
