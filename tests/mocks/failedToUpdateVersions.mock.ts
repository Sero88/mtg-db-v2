import { Version } from "@/types/collection";

export const failedToUpdateVersionsMock: Version[] = [
	{
		collectionNumber: "187",
		images: [
			{
				artist: "Dan Scott",
				imageUri:
					"https://c1.scryfall.com/file/scryfall-cards/normal/front/2/2/2267c580-b641-4d6f-8bd9-deb1c6393d14.jpg?1568004714",
			},
		],
		isPromo: false,
		prices: {
			regular: 0.12,
			foil: null,
		},
		quantity: {
			regular: 2,
		},
		rarity: "rare",
		scryfallId: "2267c580-b641-4d6f-8bd9-deb1c6393d14",
		set: "c19",
		oracleId: "2dbe8aaa-2e34-4552-8da7-cf8ecbbaa7b6",
	},
	{
		collectionNumber: "20",
		images: [
			{
				artist: "Steve Ellis",
				imageUri:
					"https://c1.scryfall.com/file/scryfall-cards/normal/front/e/8/e8534c3b-440e-4c13-a27d-819bb325c0e6.jpg?1562944019",
			},
		],
		isPromo: false,
		prices: {
			regular: 3.04,
			foil: null,
		},
		quantity: {
			regular: 2,
		},
		rarity: "uncommon",
		scryfallId: "e8534c3b-440e-4c13-a27d-819bb325c0e6",
		set: "dd1",
		oracleId: "7df3e379-c217-416e-a1c8-46338608c49e",
	},
];

export const cardsOfFailedToUpdateVersionsMock = [
	{
		oracleId: "2dbe8aaa-2e34-4552-8da7-cf8ecbbaa7b6",
		cardFaces: [
			{
				manaValue: 2,
				manaCost: "{X}{G/U}{G/U}",
				flavorText:
					'"A regression to ancient forms? A glimpse of future evolutions? Or a fleeting alteration of the present?"\n—Vorel of the Hull Clade',
				oracleText:
					"Creatures you control have base power and toughness X/X until end of turn.",
			},
		],
		colorIdentity: ["G", "U"],
		name: "Biomass Mutation",
		types: ["Instant"],
		versions: [
			{
				_id: "61ffd32aeeadc3037c78230f",
				collectionNumber: "187",
				images: [
					{
						artist: "Dan Scott",
						imageUri:
							"https://c1.scryfall.com/file/scryfall-cards/normal/front/2/2/2267c580-b641-4d6f-8bd9-deb1c6393d14.jpg?1568004714",
					},
				],
				isPromo: false,
				prices: {
					regular: "0.12",
					foil: null,
				},
				quantity: {
					regular: 2,
				},
				rarity: "rare",
				scryfallId: "2267c580-b641-4d6f-8bd9-deb1c6393d14",
				set: "c19",
				oracleId: "2dbe8aaa-2e34-4552-8da7-cf8ecbbaa7b6",
			},
		],
	},
	{
		oracleId: "7df3e379-c217-416e-a1c8-46338608c49e",
		cardFaces: [
			{
				manaValue: 4,
				manaCost: "{3}{G}",
				flavorText:
					"The faultless and immaculate castes form the lower tiers of elvish society, with the exquisite caste above them. At the pinnacle is the perfect, a consummate blend of aristocrat and predator.",
				oracleText:
					"Create a 1/1 green Elf Warrior creature token for each Elf you control.",
			},
		],
		colorIdentity: ["G"],
		name: "Elvish Promenade",
		types: ["Tribal", "Sorcery", "Elf"],
		versions: [
			{
				_id: "61ffd32aeeadc3037c782310",
				collectionNumber: "20",
				images: [
					{
						artist: "Steve Ellis",
						imageUri:
							"https://c1.scryfall.com/file/scryfall-cards/normal/front/e/8/e8534c3b-440e-4c13-a27d-819bb325c0e6.jpg?1562944019",
					},
				],
				isPromo: false,
				prices: {
					regular: "3.04",
					foil: null,
				},
				quantity: {
					regular: 2,
				},
				rarity: "uncommon",
				scryfallId: "e8534c3b-440e-4c13-a27d-819bb325c0e6",
				set: "dd1",
				oracleId: "7df3e379-c217-416e-a1c8-46338608c49e",
			},
		],
	},
];
