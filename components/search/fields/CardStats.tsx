import { CardStatType, SearchFieldNames } from "@/types/search";
import { useState } from "react";

type CardColorProps = {
	fieldData: {
		name: SearchFieldNames.STATS;
		value: CardStatType[];
	};
	changeHandler: (fieldName: SearchFieldNames, value: CardStatType[]) => void;
};
export function CardStats({ fieldData, changeHandler }: CardColorProps) {
	// const stats = [
	// 	{ name: "manaValue", title: "Mana Value" },
	// 	{ name: "power", title: "Power" },
	// 	{ name: "toughness", title: "Toughness" },
	// 	{ name: "loyalty", title: "Loyalty" },
	// ];

	return (
		<>
			<h2>Card Stats</h2>
		</>
	);
}
