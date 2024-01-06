import { DataError } from "@/components/utils/DataError";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import { ScryfallSetDataProvider } from "@/providers/ScryfallSetDataProvider";
import { getScryfallSetData } from "@/utils/dataFetch/scryfallSets";
import { getScryfallSymbolData } from "@/utils/dataFetch/scryfallSymbols";

export const metadata = {
	title: "Search Collection",
};

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
	const sets = await getScryfallSetData();
	const symbols = await getScryfallSymbolData();

	return sets?.data && sets?.data ? (
		<ScryfallSymbolDataProvider symbols={symbols.data}>
			<ScryfallSetDataProvider sets={sets.data}>{children}</ScryfallSetDataProvider>
		</ScryfallSymbolDataProvider>
	) : (
		<DataError />
	);
}
