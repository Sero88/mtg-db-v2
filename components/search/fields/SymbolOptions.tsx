import { SelectorListItem } from "@/types/searchSelector";
import styles from "@/styles/symbolOptions.module.scss";

type SymbolOptionsProps = {
	symbols: SelectorListItem[];
	highlightedOption: number;
};

export function SymbolOptions({ symbols, highlightedOption }: SymbolOptionsProps) {
	if (!symbols.length) {
		return null;
	}
	const symbolsDisplay = symbols.map((symbol, index) => {
		return (
			<p
				className={
					highlightedOption === index ? styles.highlightedOption : styles.regularOption
				}
			>
				{symbol.display}
			</p>
		);
	});

	return <div data-testid="symbolOptions">{symbolsDisplay}</div>;
}
