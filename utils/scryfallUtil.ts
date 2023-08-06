import { ScryfallCard } from "@/types/scryfall";

export const ScryfallUtil = {
	getPromoString(scryfallCard: ScryfallCard) {
		const findLetterRegex = /[a-z]+/gi;

		const regex = new RegExp(findLetterRegex);

		const regexResult = regex.exec(scryfallCard.collector_number);

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

	getCollectorsData(scryfallCard: ScryfallCard) {
		const promoString = this.getPromoString(scryfallCard);
		return {
			number: this.getCollectorsNumber(scryfallCard, promoString),
			type: this.getCollectionType(promoString),
		};
	},

	getCollectorsNumber(scryfallCard: ScryfallCard, promoString: string) {
		return promoString
			? scryfallCard.collector_number.replace(promoString, "")
			: scryfallCard.collector_number;
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

	/**
	 *
	 * @param scryfallCard
	 * @returns types such as Tribal, Sorcery, Instant, etc
	 */
	getCardTypes: function (scryfallCard: ScryfallCard) {
		const typeLineString = scryfallCard.type_line
			? scryfallCard.type_line.replace(/(—\s)|(\/\s?)+/g, "")
			: ""; //replace "-" or "/"
		const typesArray = typeLineString.split(" ");

		const types: string[] = [];
		typesArray.forEach((type) => {
			if (!types.includes(type)) {
				types.push(type);
			}
		});

		return types;
	},

	isMultiface: function (scryfallCard: ScryfallCard): boolean {
		return !!scryfallCard?.card_faces;
	},
};
