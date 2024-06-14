import { SelectorListItem } from "@/types/searchSelector";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/selectedList.module.scss";

type SelectedListProps = {
	list: SelectorListItem[];
	removeHandler: (itemValue: string) => void;
};
export function SelectedList({ list, removeHandler }: SelectedListProps) {
	const selectedItems = list.map((item, index) => {
		return (
			<li key={`${item.value}-${index}`} className={styles.selectedListItem}>
				<FontAwesomeIcon
					icon={faClose}
					onClick={() => removeHandler(item.value)}
					data-testid={`remove-${item.value}`}
				/>
				{item.display}
			</li>
		);
	});
	return (
		<div>
			<ul className={styles.selectedList}>{selectedItems}</ul>
		</div>
	);
}
