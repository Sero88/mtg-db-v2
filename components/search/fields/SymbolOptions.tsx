import { SelectorListItem } from "@/types/searchSelector";
import styles from "@/styles/symbolOptions.module.scss";

type SymbolOptionsProps = {
	symbols: SelectorListItem[];
	highlightedOption: number;
};

export function SymbolOptions({ symbols, highlightedOption }: SymbolOptionsProps) {
	const symbolsDisplay = symbols?.map((symbol, index) => {
		const isActiveOption = highlightedOption === index;
		const activeOptionProp = isActiveOption
			? { ["data-testid"]: `active-hightlight-${index}` }
			: {};

		return (
			<div
				className={isActiveOption ? styles.highlightedOption : styles.regularOption}
				key={index + symbol.value}
				{...activeOptionProp}
			>
				{symbol.display} {isActiveOption && <span>(Press: Enter)</span>}
			</div>
		);
	});

	return symbolsDisplay?.length ? (
		<div data-testid="symbolOptions" className={styles.symbolOptions}>
			{symbolsDisplay}
		</div>
	) : null;
}
