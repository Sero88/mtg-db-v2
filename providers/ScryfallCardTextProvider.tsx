"use client";

import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { ScryfallSymbol } from "@/types/scryfall";

type ScryfallDataProviderProps = {
	symbols: ScryfallSymbol[];
	children: React.ReactNode;
};

export function ScryfallSymbolDataProvider({ symbols, children }: ScryfallDataProviderProps) {
	return (
		<ScryfallSymbolDataContext.Provider value={symbols}>
			{children}
		</ScryfallSymbolDataContext.Provider>
	);
}
