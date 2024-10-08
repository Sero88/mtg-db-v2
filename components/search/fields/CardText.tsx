import { SearchFieldNames } from "@/types/search";
import { SearchSelector } from "../../utils/SearchSelector";
import { useContext, useMemo, useState } from "react";
import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import {
	createSymbolsMapAndArray,
	getNewHightlightedItemBasedOnMovement,
	getSymbolsSearchString,
	isSymbolOptionsNeeded,
} from "@/components/utils/CardTextUtil";
import { TranslatedCardText } from "./TranslatedCardText";
import { SymbolOptions } from "./SymbolOptions";
import styles from "@/styles/cardTextField.module.scss";
import { AcceptKeys, MoveKeys } from "@/types/cardText";
import { SelectorListItem } from "@/types/searchSelector";

type CardTextProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string;
	};
	changeHandler: (value: any) => void;
};

export function CardText({ changeHandler, fieldData }: CardTextProps) {
	const symbols = useContext(ScryfallSymbolDataContext);
	const [isFocused, setIsFocused] = useState(false);
	const [dynamicOptionsEnabled, setDynamicOptionsEnabled] = useState(false);
	const [highlightedOptionIndex, setHighlightedOptionIndex] = useState<number>(0);
	const acceptKeyCodes = [AcceptKeys.ENTER, AcceptKeys.TAB];
	const moveKeyCodes = [MoveKeys.DOWN, MoveKeys.UP];

	const { symbolsMap, symbolsArray } = useMemo(
		() => createSymbolsMapAndArray(symbols),
		[symbols]
	);

	const onSelectSearchItem = (item: SelectorListItem) => {
		const selectedSymbol = symbolsMap.get(item.value);
		changeHandler(fieldData?.value + selectedSymbol?.symbol);
	};

	const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setHighlightedOptionIndex(0);
		runChangeHandler(event.target.value);
	};

	const runChangeHandler = (newValue: string) => {
		setDynamicOptionsEnabled(isSymbolOptionsNeeded(newValue));
		changeHandler(newValue);
	};

	const keyDownHandler = (event: React.KeyboardEvent) => {
		if (acceptKeyCodes.includes(event.code as AcceptKeys) && showInputOptions) {
			event.preventDefault();
			const newValue =
				fieldData?.value?.slice(0, symbolSearchData.position.start) +
				filteredSymbols[highlightedOptionIndex]?.value +
				fieldData?.value?.slice(symbolSearchData.position.end);
			runChangeHandler(newValue);
		}

		if (moveKeyCodes.includes(event.code as MoveKeys) && showInputOptions) {
			const newHighlightedIndex = getNewHightlightedItemBasedOnMovement(
				event.code as MoveKeys,
				highlightedOptionIndex,
				filteredSymbols?.length
			);
			setHighlightedOptionIndex(newHighlightedIndex);
		}
	};

	const showInputOptions = isFocused && dynamicOptionsEnabled;
	const symbolSearchData = getSymbolsSearchString(fieldData?.value);
	const symbolsSearchString = showInputOptions
		? symbolSearchData?.searchText.toLowerCase()
		: null;

	const filteredSymbols =
		symbolsSearchString !== null
			? symbolsArray.filter((symbol) =>
					symbol?.searchValue
						? symbol.searchValue.includes(symbolsSearchString)
						: symbol.value.includes(symbolsSearchString)
			  )
			: [];

	return (
		<>
			<h2>Card Text</h2>

			<div
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className={styles.cardText}
			>
				<div>
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
					</label>
					{showInputOptions && (
						<SymbolOptions
							symbols={filteredSymbols}
							highlightedOption={highlightedOptionIndex}
						/>
					)}
				</div>

				<SearchSelector items={symbolsArray} clickHandler={onSelectSearchItem} />
			</div>
			<TranslatedCardText textToTranslate={fieldData?.value} symbols={symbolsMap} />
		</>
	);
}
