import { ScryfallSymbol } from "@/types/scryfall";

export const symbolsList: ScryfallSymbol[] = [
	{
		symbol: "{6}",
		svg_uri: "https://svgs.scryfall.io/card-symbols/6.svg",
		english: "six generic mana",
		represents_mana: true,
		cmc: 6,
		colors: [],
	},
	{
		symbol: "{7}",
		svg_uri: "https://svgs.scryfall.io/card-symbols/7.svg",
		english: "seven generic mana",
		represents_mana: true,
		cmc: 7,
		colors: [],
	},
	{
		symbol: "{8}",
		svg_uri: "https://svgs.scryfall.io/card-symbols/8.svg",
		english: "eight generic mana",
		represents_mana: true,
		cmc: 8,
		colors: [],
	},
	{
		symbol: "{R/G}",
		svg_uri: "https://svgs.scryfall.io/card-symbols/RG.svg",
		english: "one red or green mana",
		represents_mana: true,
		cmc: 1,
		colors: ["r", "b"],
	},
];
const mapFromArray = new Map();

symbolsList.forEach((symbol) => {
	mapFromArray.set(symbol.symbol, symbol);
});
export const symbolsMap = mapFromArray;

export const symbolsMapAndArrayMock = {
	symbolsMap: new Map([
		[
			"{−}",
			{
				symbol: "−",
				svg_uri: "",
				english: "− planeswalker minus ability",
				represents_mana: false,
				colors: [],
				loose_variant: false,
				cmc: 0,
			},
		],
		[
			"{+}",
			{
				symbol: "+",
				svg_uri: "",
				english: "+ planeswalker plus ability",
				represents_mana: false,
				colors: [],
				loose_variant: false,
				cmc: 0,
			},
		],
	]),
	symbolsArray: [
		{
			value: "−",
			display: "test",
			searchValue: "{−}::− planeswalker minus ability",
		},
		{
			value: "+",
			display: "test",
			searchValue: "{+}::+ planeswalker plus ability",
		},
	],
};
