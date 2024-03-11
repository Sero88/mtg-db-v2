import { IsNotSelectorItem } from "@/types/isNotSelector";

export const typesMock = ["elf", "planeswalker", "creature"];
export const selectedTypesMapMock: Map<String, IsNotSelectorItem> = new Map([
	["elf", { value: "elf", is: true }],
	["planeswalker", { value: "planeswalker", is: false }],
]);
