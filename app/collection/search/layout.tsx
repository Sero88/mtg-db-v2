import { DataError } from "@/components/utils/DataError";
import { CollectionTypesDataProvider } from "@/providers/CollectionCardTypeProvider";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import { ScryfallSetDataProvider } from "@/providers/ScryfallSetDataProvider";
import { getCollectionTypes } from "@/utils/dataFetch/collectionTypes";
import { getScryfallSetData } from "@/utils/dataFetch/scryfallSets";
import { getScryfallSymbolData } from "@/utils/dataFetch/scryfallSymbols";

export const metadata = {
	title: "Search Collection",
};

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
	const sets = await getScryfallSetData();
	const symbols = await getScryfallSymbolData();
	const types = await getCollectionTypes();

	return sets?.data && sets?.data && types?.success ? (
		<ScryfallSymbolDataProvider symbols={symbols.data}>
			<ScryfallSetDataProvider sets={sets.data}>
				<CollectionTypesDataProvider types={types.data as string[]}>
					{children}
				</CollectionTypesDataProvider>
			</ScryfallSetDataProvider>
		</ScryfallSymbolDataProvider>
	) : (
		<DataError />
	);
}
