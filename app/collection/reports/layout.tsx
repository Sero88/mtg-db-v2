import { DataError } from "@/components/utils/DataError";
import { CollectionVersionsDataProvider } from "@/providers/CollectionVerionsProvider";
import { Version } from "@/types/collection";
import { getCollectionVersions } from "@/utils/dataFetch/collectionVersions";

export const metadata = {
	title: "Collection Reports",
};

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
	const versionsData = await getCollectionVersions();

	return versionsData.success ? (
		<CollectionVersionsDataProvider versions={versionsData?.data as Version[]}>
			{children}
		</CollectionVersionsDataProvider>
	) : (
		<DataError />
	);
}
