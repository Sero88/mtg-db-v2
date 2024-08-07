export const scryfallSetsMock = [
	{
		object: "set",
		id: "94bd6d6b-a3df-4f03-b25f-ee3f57f7f2da",
		code: "dd1",
		mtgo_code: "evg",
		arena_code: "evg",
		tcgplayer_id: 33,
		name: "Duel Decks: Elves vs. Goblins",
		uri: "https://api.scryfall.com/sets/94bd6d6b-a3df-4f03-b25f-ee3f57f7f2da",
		scryfall_uri: "https://scryfall.com/sets/dd1",
		search_uri:
			"https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Add1&unique=prints",
		released_at: "2007-11-16",
		set_type: "duel_deck",
		card_count: 62,
		digital: false,
		nonfoil_only: false,
		foil_only: false,
		icon_svg_uri: "https://svgs.scryfall.io/sets/dd1.svg?1722225600",
	},
	{
		object: "set",
		id: "0fa3ccbb-d86d-4a2e-a55e-c4979c4feeb2",
		code: "c19",
		mtgo_code: "c19",
		arena_code: "c19",
		tcgplayer_id: 2481,
		name: "Commander 2019",
		uri: "https://api.scryfall.com/sets/0fa3ccbb-d86d-4a2e-a55e-c4979c4feeb2",
		scryfall_uri: "https://scryfall.com/sets/c19",
		search_uri:
			"https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ac19&unique=prints",
		released_at: "2019-08-23",
		set_type: "commander",
		card_count: 302,
		digital: false,
		nonfoil_only: false,
		foil_only: false,
		block_code: "cmd",
		block: "Commander",
		icon_svg_uri: "https://svgs.scryfall.io/sets/c19.svg?1722225600",
	},
];

export const SetsMockWithBrokenThreeCharRule = [
	...scryfallSetsMock,
	{
		object: "set",
		id: "0fa3ccbb-d86d-4a2e-a55e-c4979c4feeb3",
		code: "af20",
		mtgo_code: "af20",
		arena_code: "af20",
		tcgplayer_id: 2481,
		name: "Testing Fake set",
		uri: "https://api.scryfall.com/sets/0fa3ccbb-d86d-4a2e-a55e-c4979c4feeb2",
		scryfall_uri: "https://scryfall.com/sets/f20",
		search_uri:
			"https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Ac19&unique=prints",
		released_at: "2019-08-23",
		set_type: "commander",
		card_count: 302,
		digital: false,
		nonfoil_only: false,
		foil_only: false,
		block_code: "cmd",
		block: "Commander",
		icon_svg_uri: "https://svgs.scryfall.io/sets/f20.svg?1722225600",
	},
];
