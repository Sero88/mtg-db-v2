import { SearchFields } from "@/types/search";
import { SearchSelector } from "../../utils/SearchSelector";
import { useContext, useMemo } from "react";
import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { createSymbolsMapAndArray } from "@/components/utils/CardText";
import { TranslatedCardText } from "./TranslatedCardText";

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

	const onSelectSearchItem = (value: string) => {
		const selectedSymbol = symbolsMap.get(value);
		changeHandler(fieldData?.name, fieldData?.value + selectedSymbol?.symbol);
	};

	return (
		<>
			<TranslatedCardText textToTranslate={fieldData?.value} symbols={symbolsMap} />
			<label>
				<textarea
					name={fieldData?.name}
					onChange={(event) => changeHandler(fieldData?.name, event?.target?.value)}
					value={fieldData?.value}
				/>
				<br />
				Text
			</label>

			<SearchSelector items={symbolsArray} clickHandler={onSelectSearchItem} />
		</>
	);
}
