import { QuantityCardCollection } from "@/types/collection";

import { ScryfallCard } from "../types/scryfall";

export const helpers = {
	collectionLimit: 4, //limit of each card in collection

	apiResponse: function (success: boolean, data: unknown = undefined) {
		return {
			success,
			data,
		};
	},

	convertNameToHtmlId(name: string): string {
		return name.replace(/\s/g, "-");
	},

	getCollectorsData(apiCardData: ScryfallCard) {
		const promoString = this.getCollectionPromoString(apiCardData);
		return {
			number: this.getCollectorsNumber(apiCardData, promoString),
			type: this.getCollectionType(promoString),
		};
	},

	getCollectorsNumber(apiCardData: ScryfallCard, promoString: string) {
		return promoString
			? apiCardData.collector_number.replace(promoString, "")
			: apiCardData.collector_number;
	},

	getCollectionType(promoString: string) {
		type CollectionType = {
			[key: string]: string;
		};

		const collectionType: CollectionType = {
			s: "pre-release",
			p: "promo",
		};

		return promoString in collectionType ? collectionType[promoString] : "";
	},

	getCollectionPromoString(apiCardData: ScryfallCard) {
		const findLetterRegex = /[a-z]+/gi;

		const regex = new RegExp(findLetterRegex);

		const regexResult = regex.exec(apiCardData.collector_number);

		return regexResult?.[0] ? regexResult?.[0] : "";
	},

	scryfallCardHasRegularVersion(card: ScryfallCard) {
		return card.finishes.includes("nonfoil");
	},

	scryfallCardHasFoilVersion(card: ScryfallCard) {
		const foilFinishes = ["foil", "etched"];
		let hasFoil = false;

		for (let i = 0; i < foilFinishes.length; i++) {
			if (card.finishes.includes(foilFinishes[i])) {
				hasFoil = true;
				break;
			}
		}

		return hasFoil;
	},

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
};
