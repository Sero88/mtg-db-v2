import { QuantityCardCollection } from "@/types/collection";

export const CollectionCardHelper = {
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
