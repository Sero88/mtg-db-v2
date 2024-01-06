import { SearchFields } from "@/types/search";
import { SearchSelector } from "../../utils/SearchSelector";
import { useContext, useMemo } from "react";
import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { createSymbolsMapAndArray } from "@/components/utils/CardText";

type CardTextProps = {
	fieldData: {
		name: SearchFields;
		value: string;
	};
	changeHandler: (fieldName: SearchFields, value: any) => void;
};

export function CardText({ changeHandler, fieldData }: CardTextProps) {
	const symbols = useContext(ScryfallSymbolDataContext);

	const { symbolsMap, symbolsArray } = useMemo(
		() => createSymbolsMapAndArray(symbols),
		[symbols.length]
	);

	return (
		<>
			<label>
				<input
					name={fieldData?.name}
					onChange={(event) => changeHandler(fieldData?.name, event?.target?.value)}
					value={fieldData?.value}
				/>
				<br />
				Text
			</label>

			<SearchSelector
				items={symbolsArray}
				clickHandler={(value) => console.log(symbolsMap.get(value)?.symbol)}
			/>
		</>
	);
}
