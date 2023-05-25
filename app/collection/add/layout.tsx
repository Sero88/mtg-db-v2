import { DataError } from "@/components/utils/DataError";
import { ScryfallSetDataProvider } from "@/providers/ScryfallSetDataProvider";
import { getScryfallSetData } from "@/utils/dataFetch/scryfallSets";

export const metadata = {
	title: "Add to Collection",
};

export default async function AddLayout({ children }: { children: React.ReactNode }) {
	const sets = await getScryfallSetData();

	return sets?.data ? (
		<ScryfallSetDataProvider sets={sets.data}>{children}</ScryfallSetDataProvider>
	) : (
		<DataError />
	);
}
