import { SelectorListItem } from "@/types/searchSelector";

type SymbolOptionsProps = {
	text: string;
	symbols: SelectorListItem[];
};

export function SymbolOptions({ text, symbols }: SymbolOptionsProps) {
	if (!text) {
		return null;
	}

	const rawText = text.replace("{", "");

	const filteredData = symbols.filter((symbol) =>
		symbol?.searchValue ? symbol.searchValue.includes(rawText) : symbol.value.includes(rawText)
	);

	const symbolsDisplay = filteredData.map((symbol) => {
		return <p>{symbol.display}</p>;
	});

	return <div data-testid="symbolOptions">{symbolsDisplay}</div>;
}
