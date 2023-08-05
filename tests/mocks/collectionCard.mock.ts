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
		{
			manaValue: 3,
			manaCost: "{2}{G}",
			power: "2",
			toughness: "2",
			oracleText:
				"When Nissa, Vastwood Seer enters the battlefield, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle.\nWhenever a land enters the battlefield under your control, if you control seven or more lands, exile Nissa, then return her to the battlefield transformed under her owner's control.",
		},
		{
			loyalty: "3",
			manaCost: null,
			manaValue: null,
			oracleText:
				"+1: Reveal the top card of your library. If it's a land card, put it onto the battlefield. Otherwise, put it into your hand.\n−2: Create Ashaya, the Awoken World, a legendary 4/4 green Elemental creature token.\n−7: Untap up to six target lands. They become 6/6 Elemental creatures. They're still lands.",
		},
	],
	keywords: ["Transform"],
};

export const nissaVastwoodSeerCollectionVersion = {
	set: "s15",
	scryfallId: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
	oracleId: "35754a21-9fba-4370-a254-292918a777ba",
	isPromo: true,
	collectionNumber: "189",
	rarity: "mythic",
	prices: { regular: null, foil: 70.57 },
	images: [
		{
			artist: "Wayne Reynolds",
			imageUri:
				"https://cards.scryfall.io/normal/front/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
		},
		{
			artist: "Wesley Burt",
			imageUri:
				"https://cards.scryfall.io/normal/back/f/f/ff0063da-ab6b-499d-8e87-8b34d46f0372.jpg?1562209457",
		},
	],
	promoTypes: ["convention"],
	"quantity.foil": 1,
};
