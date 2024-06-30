"use client";

import { CollectionVersionsContext } from "@/contexts/CollectionVersionsContext";
import { Version } from "@/types/collection";

type CollectionVersionsProviderProps = {
	versions: Version[];
	children: React.ReactNode;
};

export function CollectionVersionsDataProvider({
	versions,
	children,
}: CollectionVersionsProviderProps) {
	return (
		<CollectionVersionsContext.Provider value={versions}>
			{children}
		</CollectionVersionsContext.Provider>
	);
}
