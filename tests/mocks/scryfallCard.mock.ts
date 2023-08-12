import { ScryfallCard } from "@/types/scryfall";

export const elvishMystic: ScryfallCard = {
	id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
	oracle_id: "3f3b2c10-21f8-4e13-be83-4ef3fa36e123",
	name: "Elvish Mystic",
	layout: "normal",
	image_uris: {
		small: "https://cards.scryfall.io/small/front/6/0/60d0e6a6-629a-45a7-bfcb-25ba7156788b.jpg?1562829984",
		normal: "https://cards.scryfall.io/normal/front/6/0/60d0e6a6-629a-45a7-bfcb-25ba7156788b.jpg?1562829984",
	},
	mana_cost: "{G}",
	type_line: "Creature — Elf Druid",
	oracle_text: "{T}: Add {G}.",
	power: "1",
	toughness: "1",
	color_identity: ["G"],
	keywords: [],
	legalities: {
		standard: "not_legal",
		future: "not_legal",
		historic: "legal",
		gladiator: "legal",
		pioneer: "legal",
		explorer: "legal",
		modern: "legal",
		legacy: "legal",
		pauper: "legal",
		vintage: "legal",
		penny: "legal",
		commander: "legal",
		oathbreaker: "legal",
		brawl: "not_legal",
		historicbrawl: "legal",
		alchemy: "not_legal",
		paupercommander: "legal",
		duel: "legal",
		oldschool: "not_legal",
		premodern: "not_legal",
		predh: "not_legal",
	},
	finishes: ["nonfoil", "foil"],
	promo: false,
	set: "m14",
	set_name: "Magic 2014",
	set_type: "core",
	collector_number: "169",
	rarity: "common",
	flavor_text:
		'"Life grows everywhere. My kin merely find those places where it grows strongest."\n—Nissa Revane',
	artist: "Wesley Burt",
	prices: {
		usd: "0.44",
		usd_foil: "8.39",
	},
};

export const elvishMysticLordOfTheRingsPrint: ScryfallCard = {
	id: "880468be-3f4d-4dbf-92e7-cf212da7f718",
	oracle_id: "3f3b2c10-21f8-4e13-be83-4ef3fa36e123",
	name: "Elvish Mystic",
	layout: "normal",
	image_uris: {
		small: "https://cards.scryfall.io/small/front/8/8/880468be-3f4d-4dbf-92e7-cf212da7f718.jpg?1686965975",
		normal: "https://cards.scryfall.io/normal/front/8/8/880468be-3f4d-4dbf-92e7-cf212da7f718.jpg?1686965975",
	},
	mana_cost: "{G}",
	type_line: "Creature — Elf Druid",
	oracle_text: "{T}: Add {G}.",
	power: "1",
	toughness: "1",
	color_identity: ["G"],
	keywords: [],
	legalities: {
		standard: "not_legal",
		future: "not_legal",
		historic: "legal",
		gladiator: "legal",
		pioneer: "legal",
		explorer: "legal",
		modern: "legal",
		legacy: "legal",
		pauper: "legal",
		vintage: "legal",
		penny: "legal",
		commander: "legal",
		oathbreaker: "legal",
		brawl: "not_legal",
		historicbrawl: "legal",
		alchemy: "not_legal",
		paupercommander: "legal",
		duel: "legal",
		oldschool: "not_legal",
		premodern: "not_legal",
		predh: "not_legal",
	},
	finishes: ["nonfoil"],
	promo: false,
	set: "ltc",
	set_name: "Tales of Middle-earth Commander",
	set_type: "commander",
	collector_number: "238",
	rarity: "common",
	flavor_text:
		'"The Three Rings of the Elves were not made as weapons of war or conquest—that is not their power. Those who made them did not desire strength or domination or hoarded wealth, but understanding, making, and healing, to preserve all things unstained."\n—Elrond',
	artist: "Iga Oliwiak",
	prices: {
		usd: "0.59",
		usd_foil: null,
	},
};

//this is a promo: convention, double-face card with only a foil print
export const nissaVastwoodSeer: ScryfallCard = {
	id: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
	oracle_id: "35754a21-9fba-4370-a254-292918a777ba",
	name: "Nissa, Vastwood Seer // Nissa, Sage Animist",
	layout: "transform",
	type_line: "Legendary Creature — Elf Scout // Legendary Planeswalker — Nissa",
	color_identity: ["G"],
	keywords: ["Transform"],
	card_faces: [
		{
			mana_cost: "{2}{G}",
			oracle_text:
				"When Nissa, Vastwood Seer enters the battlefield, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle.\nWhenever a land enters the battlefield under your control, if you control seven or more lands, exile Nissa, then return her to the battlefield transformed under her owner's control.",
			power: "2",
			toughness: "2",
			artist: "Wayne Reynolds",
			image_uris: {
				small: "https://cards.scryfall.io/small/front/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
				normal: "https://cards.scryfall.io/normal/front/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
			},
		},
		{
			mana_cost: "",
			oracle_text:
				"+1: Reveal the top card of your library. If it's a land card, put it onto the battlefield. Otherwise, put it into your hand.\n−2: Create Ashaya, the Awoken World, a legendary 4/4 green Elemental creature token.\n−7: Untap up to six target lands. They become 6/6 Elemental creatures. They're still lands.",
			loyalty: "3",
			artist: "Wayne Reynolds",
			image_uris: {
				small: "https://cards.scryfall.io/small/back/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
				normal: "https://cards.scryfall.io/normal/back/0/0/008b1ea5-1a8d-4a9d-b208-421fea2f9c58.jpg?1666871396",
			},
		},
	],
	legalities: {
		standard: "not_legal",
		future: "not_legal",
		historic: "not_legal",
		gladiator: "not_legal",
		pioneer: "legal",
		explorer: "not_legal",
		modern: "legal",
		legacy: "legal",
		pauper: "not_legal",
		vintage: "legal",
		penny: "not_legal",
		commander: "legal",
		oathbreaker: "legal",
		brawl: "not_legal",
		historicbrawl: "not_legal",
		alchemy: "not_legal",
		paupercommander: "not_legal",
		duel: "legal",
		oldschool: "not_legal",
		premodern: "not_legal",
		predh: "not_legal",
	},
	finishes: ["foil"],
	promo: true,
	set: "ps15",
	set_name: "San Diego Comic-Con 2015",
	set_type: "promo",
	collector_number: "189",
	rarity: "mythic",
	artist: "Wayne Reynolds",
	promo_types: ["convention"],
	prices: {
		usd: null,
		usd_foil: "64.21",
	},
};

export const priestOfTitania: ScryfallCard = {
	id: "19fc5956-286c-4e1d-bc4a-2974fc0f4dbc",
	oracle_id: "3a198a16-17b9-481e-b516-5bc945c7e247",
	name: "Priest of Titania",
	layout: "normal",
	image_uris: {
		small: "https://cards.scryfall.io/small/front/1/9/19fc5956-286c-4e1d-bc4a-2974fc0f4dbc.jpg?1592673130",
		normal: "https://cards.scryfall.io/normal/front/1/9/19fc5956-286c-4e1d-bc4a-2974fc0f4dbc.jpg?1592673130",
	},
	mana_cost: "{1}{G}",
	type_line: "Creature — Elf Druid",
	oracle_text: "{T}: Add {G} for each Elf on the battlefield.",
	power: "1",
	toughness: "1",
	color_identity: ["G"],
	keywords: [],
	legalities: {
		standard: "not_legal",
		future: "not_legal",
		historic: "not_legal",
		gladiator: "not_legal",
		pioneer: "not_legal",
		explorer: "not_legal",
		modern: "not_legal",
		legacy: "legal",
		pauper: "legal",
		vintage: "legal",
		penny: "not_legal",
		commander: "legal",
		oathbreaker: "legal",
		brawl: "not_legal",
		historicbrawl: "not_legal",
		alchemy: "not_legal",
		paupercommander: "legal",
		duel: "legal",
		oldschool: "not_legal",
		premodern: "legal",
		predh: "legal",
	},
	finishes: ["nonfoil"],
	promo: false,
	set: "cma",
	set_name: "Commander Anthology",
	set_type: "commander",
	collector_number: "136",
	rarity: "common",
	flavor_text: "Titania rewards all who honor the forest by making them a living part of it.",
	artist: "Rebecca Guay",
	prices: {
		usd: "4.08",
		usd_foil: null,
	},
};
