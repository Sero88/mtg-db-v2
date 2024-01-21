import { SelectorListItem } from "@/types/searchSelector";

type SymbolOptionsProps = {
	text: string;
	symbols: SelectorListItem[];
};

export default function SymbolOptions({ text, symbols }: SymbolOptionsProps) {
	if (!text) {
		return null;
	}

	const symbolsDisplay = symbols.map((symbol) => {
		return <p>{symbol.display}</p>;
	});

	return <>{symbolsDisplay}</>;
}
