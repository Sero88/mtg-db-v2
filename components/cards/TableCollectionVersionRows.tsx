import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";
import { Version } from "@/types/collection";
import { ScryfallUtil } from "@/utils/scryfallUtil";
import { useContext } from "react";
import styles from "@/styles/collectionCardModal.module.scss";
import { IconImage } from "./IconImage";

type TableCollectionVersionRowsProps = {
	versions: Version[];
	selectedVersion: Version;
	selectionHandler: (newSelectedVersion: Version) => void;
};
export function TableCollectionVersionRows({
	versions,
	selectedVersion,
	selectionHandler,
}: TableCollectionVersionRowsProps) {
	const sets = useContext(ScryfallSetDataContext);

	return (
		<>
			{versions.map((version: Version, index: number) => {
				const regularPrice = version.prices.regular ? "$" + version.prices.regular : "N/A";
				const foilPrice = version.prices.foil ? "$" + version.prices.foil : "N/A";
				const setImage = ScryfallUtil.getImageFromSet(sets, version.set);
				const promo = version.isPromo ? <span> promo</span> : "";
				const selectedRowClass =
					selectedVersion.scryfallId == version.scryfallId
						? styles.selectedVersion
						: styles.versionRow;
				return (
					<tr
						key={index}
						className={selectedRowClass}
						onClick={() => selectionHandler(version)}
					>
						<td className={styles.versionCell}>
							{setImage && <IconImage uri={setImage} />}
							{`${version.set.toUpperCase()} ${version.collectionNumber}`}
							{promo}
						</td>
						<td>{version.quantity.regular ?? 0}</td>
						<td>{version.quantity.foil ?? 0}</td>
						<td>
							{regularPrice} <b>|</b> {foilPrice}
						</td>
					</tr>
				);
			})}
		</>
	);
}
