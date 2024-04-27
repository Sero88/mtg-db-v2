import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { CardColorSymbol } from "@/types/collection";
import { ScryfallSymbol } from "@/types/scryfall";
import { SearchFieldNames, SelectorListType } from "@/types/search";
import { useContext, useMemo } from "react";

type CardColorProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string[];
	};
	changeHandler: (fieldName: SearchFieldNames, value: SelectorListType) => void;
};
export function CardColors({ fieldData, changeHandler }: CardColorProps) {
	const symbols = useContext(ScryfallSymbolDataContext);

	const availableColors = useMemo(() => {
		const colors: CardColorSymbol[] = [];

		symbols.forEach((symbol: ScryfallSymbol) => {
			// is a mana symbol, has a loose variant (example G for green), is at least one color, or if it doesn't have a color the name is colorless
			if (
				(symbol.represents_mana &&
					symbol.cmc == 1 &&
					symbol?.loose_variant &&
					symbol.colors.length == 1) ||
				(symbol.colors.length == 0 && symbol.english.includes("colorless"))
			) {
				const value = symbol.colors.length > 0 ? symbol.colors[0] : "null";
				colors.push({
					uri: symbol.svg_uri,
					value,
				});
			}
		});

		return colors;
	}, [symbols]);

	//todo remove after testing 👇
	console.log("availableColrs", availableColors);
	//todo remove after testing 👆

	return null;
}
