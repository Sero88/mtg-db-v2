import { SelectorListItem } from "@/types/searchSelector";
import styles from "@/styles/symbolOptions.module.scss";

type SymbolOptionsProps = {
	symbols: SelectorListItem[];
	highlightedOption: number;
};

export function SymbolOptions({ symbols, highlightedOption }: SymbolOptionsProps) {
	const symbolsDisplay = symbols?.map((symbol, index) => {
		const isActiveOption = highlightedOption === index;

		return (
			<div className={isActiveOption ? styles.highlightedOption : styles.regularOption}>
				{symbol.display} {isActiveOption && <span>(Press: Enter)</span>}
			</div>
		);
	});

	return symbolsDisplay?.length ? <div data-testid="symbolOptions">{symbolsDisplay}</div> : null;
}
