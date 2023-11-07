import { Version } from "@/types/collection";
import styles from "@/styles/collectionCardModal.module.scss";
import { TableCollectionVersionRows } from "./TableCollectionVersionRows";

type CollectionCardVersionsListProp = {
	versions: Version[];
	selectedVersion: Version;
	selectionHandler: (newCardSelection: Version) => void;
};
export function CollectionCardVersionsList({
	versions,
	selectedVersion,
	selectionHandler,
}: CollectionCardVersionsListProp) {
	return (
		<table className={styles.versionsTable}>
			<thead>
				<tr>
					<th className={styles.versionHeader}>Version</th>
					<th>Regular</th>
					<th>Foil</th>
					<th>Prices (R|F)</th>
				</tr>
			</thead>
			<tbody>
				<TableCollectionVersionRows
					versions={versions}
					selectedVersion={selectedVersion}
					selectionHandler={selectionHandler}
				/>
			</tbody>
		</table>
	);
}
