"use client";

import { ScryfallSet } from "@/types/scryfall";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";

type SetDataProviderProps = {
	sets: ScryfallSet[];
	children: React.ReactNode;
};

export function ScryfallSetDataProvider({ sets, children }: SetDataProviderProps) {
	return (
		<ScryfallSetDataContext.Provider value={sets}>{children}</ScryfallSetDataContext.Provider>
	);
}
