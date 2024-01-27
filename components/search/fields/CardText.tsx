import { SearchFields } from "@/types/search";
import { SearchSelector } from "../../utils/SearchSelector";
import { useContext, useMemo, useState } from "react";
import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { createSymbolsMapAndArray, isSymbolOptionsNeeded } from "@/components/utils/CardTextUtil";
import { TranslatedCardText } from "./TranslatedCardText";
import { SymbolOptions } from "./SymbolOptions";
import styles from "@/styles/cardTextField.module.scss";

type CardTextProps = {
	fieldData: {
		name: SearchFields;
		value: string;
	};
	changeHandler: (fieldName: SearchFields, value: any) => void;
};

export function CardText({ changeHandler, fieldData }: CardTextProps) {
	const symbols = useContext(ScryfallSymbolDataContext);
	const [isFocused, setIsFocused] = useState(false);
	const [dynamicOptionsEnabled, setDynamicOptionsEnabled] = useState(false);
	const [highlightedOption, setHighlightedOption] = useState<number>(0);
	const acceptKeyCodes = [13, 9];
	const moveKeyCodes = [38, 40];

	const { symbolsMap, symbolsArray } = useMemo(
		() => createSymbolsMapAndArray(symbols),
		[symbols.length]
	);

	const onSelectSearchItem = (value: string) => {
		const selectedSymbol = symbolsMap.get(value);
		changeHandler(fieldData?.name, fieldData?.value + selectedSymbol?.symbol);
	};

	const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDynamicOptionsEnabled(isSymbolOptionsNeeded(event.target.value));
		changeHandler(fieldData?.name, event?.target?.value);
	};

	const keyDownHandler = (event: React.KeyboardEvent) => {
		console.log("event ==>", event);
	};

	const rawText = fieldData?.value.replace(/{|}/, "");

	const filteredSymbols = symbolsArray.filter((symbol) =>
		symbol?.searchValue ? symbol.searchValue.includes(rawText) : symbol.value.includes(rawText)
	);

	const showInputOptions = isFocused && dynamicOptionsEnabled;

	return (
		<div
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			className={styles.cardText}
		>
			<div>
				<TranslatedCardText textToTranslate={fieldData?.value} symbols={symbolsMap} />
				<label>
					<textarea
						name={fieldData?.name}
						onChange={textChangeHandler}
						value={fieldData?.value}
						data-testid="cardTextArea"
						className={styles.cardTextArea}
						onKeyDown={keyDownHandler}
					/>
					<br />
					Card Text
				</label>
				{showInputOptions && (
					<SymbolOptions
						symbols={filteredSymbols}
						highlightedOption={highlightedOption}
					/>
				)}
			</div>
			<SearchSelector items={symbolsArray} clickHandler={onSelectSearchItem} />
		</div>
	);
}
