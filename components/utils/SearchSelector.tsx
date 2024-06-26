import { SelectorListItem } from "@/types/searchSelector";
import { useState } from "react";
import styles from "@/styles/searchSelector.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type SearchSelectorProps = {
	items: SelectorListItem[];
	clickHandler: (item: SelectorListItem) => void;
};

export function SearchSelector({ items, clickHandler }: SearchSelectorProps) {
	const [searchText, setSearchText] = useState("");

	const filteredData = items.filter((item) => {
		const lowercaseSearchValue = item.searchValue?.toLowerCase() || item.value?.toLowerCase();
		const lowerCaseSearchTest = searchText?.toLowerCase();

		return lowercaseSearchValue.includes(lowerCaseSearchTest);
	});

	return (
		<div className={styles.searchList}>
			<div className={styles.searchInput}>
				<label>
					<p>Search:</p>
					<input
						type="text"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
				</label>

				<button
					type="button"
					className={styles.clearButton}
					onClick={() => setSearchText("")}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			<ul>
				{filteredData.map((item, index) => (
					<li onClick={() => clickHandler(item)} key={`${item.value}-${index}`}>
						{item.display}
					</li>
				))}
			</ul>
		</div>
	);
}
