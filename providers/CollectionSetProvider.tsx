"use client";

import { CollectionSetsContext } from "@/contexts/CollectionSetsContext";

type CollectionSetsProviderProps = {
	sets: string[];
	children: React.ReactNode;
};

export function CollectionSetsDataProvider({ sets, children }: CollectionSetsProviderProps) {
	return <CollectionSetsContext.Provider value={sets}>{children}</CollectionSetsContext.Provider>;
}
