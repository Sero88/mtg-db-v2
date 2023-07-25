import { ObjectId } from "mongodb";

export const elvishMysticCollectionCard = {
	_id: new ObjectId("61d37452968c978f78b1e6c4"),
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
