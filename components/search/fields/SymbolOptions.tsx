import { SelectorListItem } from "@/types/searchSelector";

type SymbolOptionsProps = {
	text: string;
	symbols: SelectorListItem[];
};

export function SymbolOptions({ text, symbols }: SymbolOptionsProps) {
	return null;
	if (!text) {
		return null;
	}

	const symbolsDisplay = symbols.map((symbol) => {
		return <p>{symbol.display}</p>;
	});

	return <div data-testid="symbolOptions">{symbolsDisplay}</div>;
}
