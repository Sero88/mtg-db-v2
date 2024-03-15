import { IsNotSelectorItem } from "@/types/isNotSelector";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/isNotSelector.module.scss";

type IsNotSelectorProps = {
	items: Map<String, IsNotSelectorItem>;
	updateTypes: (newSelectedTypes: Map<String, IsNotSelectorItem>) => void;
};

export function IsNotSelector({ items }: IsNotSelectorProps) {
	const isNotSelectorItems = Array.from(items.values()).map((item, index) => {
		return (
			<li
				key={`${item.value}-${index}`}
				data-testid={`${item.value}-isNotSelector`}
				className={styles.isNotItem}
			>
				<FontAwesomeIcon icon={faClose} className={styles.itemRemove} />
				{item.is ? (
					<span className={`${styles.itemIs} ${styles.itemIsTrue}`}>is</span>
				) : (
					<span className={`${styles.itemIs} ${styles.itemIsFalse}`}>not</span>
				)}
				<span className={styles.itemName}>{item.value}</span>
			</li>
		);
	});

	return (
		<div>
			<ul className={styles.isNotList}>{isNotSelectorItems}</ul>
		</div>
	);
}
