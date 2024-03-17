import { IsNotSelectorItem } from "@/types/isNotSelector";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/isNotSelector.module.scss";

type IsNotSelectorProps = {
	items: Map<String, IsNotSelectorItem>;
	updateTypes: (newSelectedTypes: Map<String, IsNotSelectorItem>) => void;
};

export function IsNotSelector({ items, updateTypes }: IsNotSelectorProps) {
	const removeItem = (itemToRemove: IsNotSelectorItem) => {
		items.delete(itemToRemove.value);
		updateTypes(items);
	};

	const changeIsValue = (item: IsNotSelectorItem) => {
		item.is = !item.is;
		items.set(item.value, item);
		updateTypes(items);
	};

	const isNotSelectorItems = Array.from(items.values()).map((item, index) => {
		const itemIs = {
			styles: item.is
				? `${styles.itemIs} ${styles.itemIsTrue}`
				: `${styles.itemIs} ${styles.itemIsFalse}`,
			text: item.is ? "is" : "not",
		};
		return (
			<li
				key={`${item.value}-${index}`}
				data-testid={`${item.value}-isNotSelector`}
				className={styles.isNotItem}
			>
				<FontAwesomeIcon
					icon={faClose}
					className={styles.itemRemove}
					onClick={() => removeItem(item)}
					data-testid={`remove-${item.value}`}
				/>
				<span
					className={itemIs.styles}
					onClick={() => changeIsValue(item)}
					data-testid={`${item.value}-isNot`}
				>
					{itemIs.text}
				</span>
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
