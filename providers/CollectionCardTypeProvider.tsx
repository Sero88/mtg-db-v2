"use client";

import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";

type CollectionTypesProviderProps = {
	types: string[] | null;
	children: React.ReactNode;
};

export function CollectionTypesDataProvider({ types, children }: CollectionTypesProviderProps) {
	return (
		<CollectionTypesContext.Provider value={types}>{children}</CollectionTypesContext.Provider>
	);
}
