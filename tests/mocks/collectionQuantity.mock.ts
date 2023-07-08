import { ObjectId } from "mongodb";

export const cardsWithRegularAndFoilQuantities = [
	{
		_id: new ObjectId("61ffd32aeeadc3037c78230f"),
		quantity: { regular: 2 },
		scryfallId: "2267c580-b641-4d6f-8bd9-deb1c6393d14",
	},
	{
		_id: new ObjectId("61ffd32aeeadc3037c782310"),
		quantity: { regular: 2 },
		scryfallId: "e8534c3b-440e-4c13-a27d-819bb325c0e6",
	},
	{
		_id: new ObjectId("61ffd32aeeadc3037c78230d"),
		quantity: { foil: 4 },
		scryfallId: "bc1b2de6-fdca-402c-923f-1e593c850b72",
	},
	{
		_id: new ObjectId("61ffd32aeeadc3037c78230b"),
		quantity: { regular: 2, foil: 2 },
		scryfallId: "42ba0e13-d20f-47f9-9c86-2b0b13c39ada",
	},
];
