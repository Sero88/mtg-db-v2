import { ScryfallCard } from "@/types/scryfall";

export const ScryfallUtil = {
	getPromoString(apiCardData: ScryfallCard) {
		const findLetterRegex = /[a-z]+/gi;

		const regex = new RegExp(findLetterRegex);

		const regexResult = regex.exec(apiCardData.collector_number);

		return regexResult?.[0] ? regexResult?.[0] : "";
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

	getCollectorsData(apiCardData: ScryfallCard) {
		const promoString = this.getPromoString(apiCardData);
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

	hasRegularVersion(card: ScryfallCard) {
		return card.finishes.includes("nonfoil");
	},

	hasFoilVersion(card: ScryfallCard) {
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
};
