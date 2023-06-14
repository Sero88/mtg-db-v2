import styles from "@/styles/pagination.module.scss";

type PaginationProps = {
	itemsInfo: {
		amountPerPage: number;
		totalItems: number;
		//to get page quantity since amountPerPage can be different on each call, not a constant, on last page the amountPerPage will differ from first
		hasMore: boolean;
	};
	updateHandler: (page: number) => void;
	currentPage: number;
};

export function Pagination({ itemsInfo, currentPage, updateHandler }: PaginationProps) {
	const pageQuantity = itemsInfo.hasMore
		? Math.ceil(itemsInfo.totalItems / itemsInfo.amountPerPage)
		: currentPage;
	const listItems = [];
	for (let i = 1; i <= pageQuantity; i++) {
		const currentPageClass = currentPage == i ? " " + styles.currentPage : "";
		listItems.push(
			<li
				key={i}
				onClick={() => updateHandler(i)}
				className={styles.pageItem + currentPageClass}
			>
				{i}{" "}
			</li>
		);
	}

	return <ul className={styles.paginationList}>{listItems}</ul>;
}
