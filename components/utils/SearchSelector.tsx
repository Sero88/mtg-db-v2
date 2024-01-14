import { SelectorListItem } from "@/types/searchSelector";
import { useState } from "react";
import styles from "@/styles/searchSelector.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Helpers } from "@/utils/helpers";

type SearchSelectorProps = {
	items: SelectorListItem[];
	clickHandler: (itemValue: string) => void;
};

export function SearchSelector({ items, clickHandler }: SearchSelectorProps) {
	const [searchText, setSearchText] = useState("");

	const filteredData = items.filter((item) =>
		item?.searchValue ? item.searchValue.includes(searchText) : item.value.includes(searchText)
	);

	return (
		<div className={styles.searchList}>
			<input
				type="text"
				value={searchText}
				onChange={(event) => setSearchText(event.target.value)}
			/>
			<button type="button" className={styles.clearButton} onClick={() => setSearchText("")}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<ul>
				{filteredData.map((item, index) => (
					<li onClick={() => clickHandler(item.value)} key={`${item.value}-${index}`}>
						{item.display}
					</li>
				))}
			</ul>
		</div>
	);
}
