import { CollectionCardQuantityTypeEnum, Version } from "@/types/collection";

export const elvishMysticCollectionCard = {
	name: "Elvish Mystic",
	oracleId: "3f3b2c10-21f8-4e13-be83-4ef3fa36e123",
	colorIdentity: ["G"],
	types: ["Creature", "Elf", "Druid"],
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
};

export const elvishMysticCollectionVersion = {
	set: "m14",
	scryfallId: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
	oracleId: "3f3b2c10-21f8-4e13-be83-4ef3fa36e123",
	isPromo: false,
	collectionNumber: "169",
	rarity: "common",
	prices: { regular: 0.44, foil: 8.39 },
	images: [
		{
			artist: "Wesley Burt",
			imageUri:
				"https://cards.scryfall.io/normal/front/6/0/60d0e6a6-629a-45a7-bfcb-25ba7156788b.jpg?1562829984",
		},
	],
	quantity: { [CollectionCardQuantityTypeEnum.REGULAR]: 1 },
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

export const nissaVastwoodSeerCollectionVersion: Version = {
	set: "s15",
	scryfallId: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
	oracleId: "35754a21-9fba-4370-a254-292918a777ba",
	isPromo: true,
	collectionNumber: "189",
	rarity: "mythic",
	prices: { regular: null, foil: 64.21 },
	images: [
		{
			artist: "Wayne Reynolds",
			imageUri:
				"https://cards.scryfall.io/normal/front/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
		},
		{
			artist: "Wayne Reynolds",
			imageUri:
				"https://cards.scryfall.io/normal/back/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
		},
	],
	promoTypes: ["convention"],
	quantity: { [CollectionCardQuantityTypeEnum.FOIL]: 1 },
};

export const plusTwoMaceCollectionVersion = {
	_id: "650cb59a7f459a9c4ada599a",
	cardFaces: [
		{
			flavorText: "The weight of this magic weapon falls heavy on the wicked.",
			manaCost: "{1}{W}",
			manaValue: 2,
			oracleText:
				"Equipped creature gets +2/+2.Equip {3} ({3}: Attach to target creature you control. Equip only as a sorcery.)",
		},
	],
	colorIdentity: ["W"],
	keywords: ["Equip"],
	name: "+2 Mace",
	oracleId: "629fe1be-272d-465f-b9b1-2ce177410f13",
	types: ["Artifact", "Equipment"],
	versions: [
		{
			_id: "650cb59a7f459a9c4ada59b5",
			collectionNumber: "1",
			images: [
				{
					artist: "Jarel Threat",
					imageUri:
						"https://cards.scryfall.io/normal/front/e/8/e882c9f9-bf30-46b6-bedc-379d2c80e5cb.jpg?1627701221",
				},
			],
			isPromo: false,
			oracleId: "629fe1be-272d-465f-b9b1-2ce177410f13",
			prices: { foil: 0.04, regular: 0.02 },
			quantity: { regular: 3 },
			rarity: "common",
			scryfallId: "e882c9f9-bf30-46b6-bedc-379d2c80e5cb",
			set: "afr",
		},
	],
};
