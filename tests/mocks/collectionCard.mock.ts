import { ObjectId } from "mongodb";

export const elvishMysticCollectionCard = {
	oracleId: "3f3b2c10-21f8-4e13-be83-4ef3fa36e123",
	cardFaces: [
		{
			manaValue: 1,
			manaCost: "{G}",
			power: "1",
			toughness: "1",
			flavorText:
				'"Life grows everywhere. My kin merely find those places where it grows strongest."\n' +
				"—Nissa Revane",
			oracleText: "{T}: Add {G}.",
		},
	],
	colorIdentity: ["G"],
	name: "Elvish Mystic",
	types: ["Creature", "Elf", "Druid"],
};

export const nissaVastwoodSeerCollectionCard = {
	name: "Nissa, Vastwood Seer // Nissa, Sage Animist",
	oracleId: "35754a21-9fba-4370-a254-292918a777ba",
	colorIdentity: ["G"],
	types: ["Legendary", "Creature", "Elf", "Scout", "Planeswalker", "Nissa"],
	cardFaces: [
		{ manaValue: 3, manaCost: "{2}{G}" },
		{ manaValue: null, manaCost: null },
	],
	keywords: ["Transform"],
};
