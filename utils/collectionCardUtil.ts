import {
	CollectionCardQuantity,
	CollectionCard,
	CollectionCardFace,
	QuantityCardCollection,
	VersionQuery,
	CollectionCardQuantityTypeEnum,
	Version,
} from "@/types/collection";
import { ScryfallCard, ScryfallCardFace } from "@/types/scryfall";
import { ScryfallUtil } from "./scryfallUtil";
import { SetUtil } from "./setUtil";

export const CollectionCardUtil = {
	mapIdWithQuantities(cardQuantities: QuantityCardCollection[] | undefined) {
		const collectionData = new Map();

		if (cardQuantities) {
			cardQuantities.forEach((cardData) => {
				if (Object.keys(cardData).length) {
					const quantity = cardData.quantity.regular ?? 0;
					const quantityFoil = cardData.quantity.foil ?? 0;
					collectionData.set(cardData.scryfallId, {
						regular: quantity,
						foil: quantityFoil,
					});
				}
			});
		}

		return collectionData;
	},

	/**
	 *
	 * @param manaCost example: as string{2}{G}
	 * @returns as number
	 */
	convertManaCost: function (manaCost: string): number | null {
		const numberRegex = /[0-9]/g;
		const numberLetterComboRegex = /[0-9]\/[A-Z]/g;
		const colorsRegex = /(?![X])[A-Z](\/[A-Z])*/gm; //ignore X values - they can be 0
		const manaNoNumberColorCombo = manaCost.replace(numberLetterComboRegex, ""); //remove any with number/letter combinations, those count as number only (alread counted above)
		const allNumbers = manaCost.match(numberRegex);
		const allColors = manaNoNumberColorCombo.match(colorsRegex);

		const addValuesReducer = (prevValue: number, currentValue: string) =>
			prevValue + parseInt(currentValue, 10);

		//add the mana value from numbers and colors
		const manaValueNumbers: number | null = allNumbers
			? allNumbers.reduce(addValuesReducer, 0)
			: null;
		const manaValueColors = allColors && allColors.length ? allColors.length : null;

		let manaValue = null;
		if (manaValueNumbers !== null && manaValueColors !== null) {
			manaValue = manaValueNumbers + manaValueColors;
		} else if (manaValueNumbers !== null && manaValueColors == null) {
			manaValue = manaValueNumbers;
		} else if (manaValueColors !== null && manaValueNumbers == null) {
			manaValue = manaValueColors;
		}

		return manaValue;
	},

	assignCardFaceValues: function (cardFaceData: ScryfallCardFace | ScryfallCard) {
		const faceObject = {} as CollectionCardFace;

		faceObject.manaValue = cardFaceData.mana_cost
			? this.convertManaCost(cardFaceData.mana_cost)
			: null;
		faceObject.manaCost =
			"mana_cost" in cardFaceData && cardFaceData.mana_cost ? cardFaceData.mana_cost : null;

		//these are optional since not all cards have these
		"loyalty" in cardFaceData ? (faceObject.loyalty = cardFaceData.loyalty) : false;
		"power" in cardFaceData && cardFaceData.power
			? (faceObject.power = cardFaceData.power)
			: false;
		"toughness" in cardFaceData && cardFaceData.toughness
			? (faceObject.toughness = cardFaceData.toughness)
			: false;
		"flavor_text" in cardFaceData && cardFaceData.flavor_text
			? (faceObject.flavorText = cardFaceData.flavor_text)
			: false;
		"oracle_text" in cardFaceData && cardFaceData.oracle_text
			? (faceObject.oracleText = cardFaceData.oracle_text)
			: false;

		return faceObject;
	},

	assignFaceImageValues: function (
		faceIndex: number,
		apiCardData: ScryfallCard,
		cardFace: ScryfallCardFace | null
	) {
		//not all multiface images have an image on each face (one sided cards). Kitsune Ascendad is a multiface card with only one image, the image is in the main card info not on either face
		const imageUri = cardFace?.image_uris?.normal
			? cardFace?.image_uris?.normal
			: faceIndex === 0
			? apiCardData?.image_uris?.normal
			: null;

		const artist = cardFace?.artist
			? cardFace.artist
			: faceIndex == 0
			? apiCardData?.artist
			: null;

		return { artist: artist ?? null, imageUri: imageUri ?? null };
	},

	buildCardQueryObject: function (scryfallCard: ScryfallCard) {
		//prepare values
		const types = ScryfallUtil.getCardTypes(scryfallCard);
		const cardFaces = [];

		//multiface values
		if (ScryfallUtil.isMultiface(scryfallCard)) {
			//@ts-ignore
			scryfallCard.card_faces.forEach((cardFace: CardFace) => {
				cardFaces.push(this.assignCardFaceValues(cardFace));
			});
		} else {
			cardFaces.push(this.assignCardFaceValues(scryfallCard));
		}

		//build query object
		const cardCollectionObject: CollectionCard = {
			name: scryfallCard.name,
			oracleId: scryfallCard.oracle_id,
			colorIdentity:
				scryfallCard.color_identity && scryfallCard.color_identity.length > 0
					? scryfallCard.color_identity
					: null,
			types,
			cardFaces,
		};

		//optional cardObject values
		"keywords" in scryfallCard && scryfallCard.keywords.length > 0
			? (cardCollectionObject.keywords = scryfallCard.keywords)
			: false;

		return cardCollectionObject;
	},

	buildVersionQueryObject(
		scryfallCard: ScryfallCard,
		quantity: number,
		type: CollectionCardQuantityTypeEnum
	) {
		const collectorsData = ScryfallUtil.getCollectorsData(scryfallCard);
		const version = {} as VersionQuery;

		version.set = SetUtil.getCardSet(scryfallCard.set);
		version.scryfallId = scryfallCard.id;
		version.oracleId = scryfallCard.oracle_id;
		version.isPromo = scryfallCard.promo;
		version.collectionNumber = collectorsData.number;
		version.rarity = scryfallCard.rarity;

		const regularPrice =
			scryfallCard &&
			"prices" in scryfallCard &&
			"usd" in scryfallCard.prices &&
			scryfallCard.prices.usd !== null
				? parseFloat(scryfallCard.prices.usd)
				: null;

		const foilPrice: number | null =
			scryfallCard &&
			"prices" in scryfallCard &&
			"usd_foil" in scryfallCard.prices &&
			scryfallCard.prices.usd_foil !== null
				? parseFloat(scryfallCard.prices.usd_foil)
				: null;

		version.prices = { regular: regularPrice, foil: foilPrice };

		const images = [];

		//multiface values
		if (ScryfallUtil.isMultiface(scryfallCard)) {
			//@ts-ignore
			scryfallCard.card_faces.forEach((cardFace: CardFace, faceIndex) => {
				images.push(this.assignFaceImageValues(faceIndex, scryfallCard, cardFace));
			});
		} else {
			images.push(this.assignFaceImageValues(0, scryfallCard, null));
		}

		version.images = images;

		//optional version values
		"promo_types" in scryfallCard ? (version.promoTypes = scryfallCard.promo_types) : false;

		//quantity value for either regular or foil
		type == CollectionCardQuantityTypeEnum.REGULAR
			? (version["quantity.regular"] = quantity)
			: (version["quantity.foil"] = quantity);

		return version;
	},

	versionIsCurrentlyUsed(version: Version, type: CollectionCardQuantityTypeEnum) {
		for (const prop in version.quantity) {
			if (version.quantity[prop as CollectionCardQuantityTypeEnum]! > 0 && prop != type) {
				return true;
			}
		}
		return false;
	},
};
