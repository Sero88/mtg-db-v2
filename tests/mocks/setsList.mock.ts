import { ScryfallSet } from "@/types/scryfall";

export const setsList: ScryfallSet[] = [
	{
		code: "tst",
		name: "Set Name 1",
		released_at: "2017-01-20",
		digital: false,
		set_type: "expansion",
		icon_svg_uri: "https://svgs.scryfall.io/sets/aer.svg?1676869200",
	},
	{
		code: "t2t",
		name: "Set Name 2",
		released_at: "2017-01-21",
		digital: false,
		set_type: "expansion",
		icon_svg_uri: "https://svgs.scryfall.io/sets/aer.svg?1676869200",
	},

	{
		code: "t3t",
		name: "Set Name 3",
		released_at: "2017-01-21",
		digital: true,
		set_type: "expansion",
		icon_svg_uri: "https://svgs.scryfall.io/sets/aer.svg?1676869200",
	},
];
