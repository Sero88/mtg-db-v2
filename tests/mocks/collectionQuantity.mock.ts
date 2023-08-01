import { CollectionCardQuantityTypeEnum } from "@/types/collection";

export const cardsWithRegularAndFoilQuantities = [
	{
		quantity: {
			[CollectionCardQuantityTypeEnum.REGULAR]: 2,
		},
		scryfallId: "2267c580-b641-4d6f-8bd9-deb1c6393d14",
	},
	{
		quantity: {
			[CollectionCardQuantityTypeEnum.REGULAR]: 2,
		},
		scryfallId: "e8534c3b-440e-4c13-a27d-819bb325c0e6",
	},
	{
		quantity: {
			[CollectionCardQuantityTypeEnum.FOIL]: 4,
		},
		scryfallId: "bc1b2de6-fdca-402c-923f-1e593c850b72",
	},
	{
		quantity: {
			[CollectionCardQuantityTypeEnum.REGULAR]: 2,
			[CollectionCardQuantityTypeEnum.FOIL]: 2,
		},
		scryfallId: "42ba0e13-d20f-47f9-9c86-2b0b13c39ada",
	},
];

export const collectionQuantityMock = {
	regular: 2,
	foil: 1,
};

export const getIdsFromQuantitiesResultMock = () => {
	return cardsWithRegularAndFoilQuantities.map((result) => result.scryfallId);
};
