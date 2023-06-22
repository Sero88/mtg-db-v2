"use client";
import React, { useEffect, useState } from "react";
import { ScryfallSearchResults } from "@/components/scryfall/ScryfallSearchResults";
import { ScryfallSearchForm } from "@/components/scryfall/scryfallSearchForm/ScryfallSearchForm";
import { ScryfallResultsTypeEnum, ScryfallSearchCardData } from "@/types/scryfall";
import { QueryResult } from "@/components/utils/QueryResult";
import { useScryfallCardSearch } from "@/hooks/useScryfallCardSearch";
import { QueryResultData } from "@/types/queryResult";
import { Pagination } from "@/components/utils/Pagination";
import styles from "@/styles/collection-add.page.module.scss";

export default function AddPage() {
	const initialCardSearch = {
		cardName: "",
		setCode: "",
	};

	const [searchCardData, setSearchCardData] = useState<ScryfallSearchCardData>(initialCardSearch);

	const [generalSearchList, setGeneralSearchList] = useState({
		cardId: "",
		previousSearch: initialCardSearch,
		page: 1,
	});

	const [page, setPage] = useState(1);

	const querySearchResponse = useScryfallCardSearch({ searchCardData, page });

	const showPagination =
		querySearchResponse?.data?.type === ScryfallResultsTypeEnum.GENERAL &&
		querySearchResponse?.data?.resultsList?.data?.length > 0 &&
		querySearchResponse?.data;

	const showBackButton =
		generalSearchList?.cardId &&
		querySearchResponse?.data?.type === ScryfallResultsTypeEnum.PRINT;

	const backFromPrintView =
		querySearchResponse?.data?.type === ScryfallResultsTypeEnum.GENERAL &&
		generalSearchList.cardId;

	const resetGeneralSearchList = () => {
		setGeneralSearchList({
			cardId: "",
			previousSearch: initialCardSearch,
			page: 1,
		});
	};

	const handleSearchFormSubmit = (newSearchCardData: ScryfallSearchCardData) => {
		setSearchCardData({ ...newSearchCardData });
		resetGeneralSearchList();
		setPage(1);
	};

	const searchCardNameHandler = (cardName: string, cardId: string) => {
		setGeneralSearchList({ cardId, previousSearch: { ...searchCardData }, page });
		setSearchCardData({ ...searchCardData, cardName });
		setPage(1);
	};

	const goBackToList = () => {
		setSearchCardData({ ...generalSearchList.previousSearch });
		setPage(generalSearchList.page);
	};

	const pageSelectionHandler = (newPage: number) => {
		setPage(newPage);
	};

	useEffect(() => {
		if (backFromPrintView) {
			document?.getElementById(generalSearchList.cardId)?.scrollIntoView();
			resetGeneralSearchList();
		}
	}, [backFromPrintView]);

	return (
		<>
			<h1>Add Cards</h1>
			<ScryfallSearchForm
				onSubmitSearch={handleSearchFormSubmit}
				disabled={querySearchResponse.isLoading}
			/>

			{showBackButton && (
				<button
					type="button"
					className={styles.backButton}
					onClick={goBackToList}
					data-testid="backToList"
				>
					&larr; Back to results list
				</button>
			)}

			{showPagination && querySearchResponse?.data && (
				<Pagination
					itemsInfo={{
						amountPerPage: querySearchResponse?.data?.resultsList?.data?.length,
						totalItems: querySearchResponse?.data?.resultsList?.total_cards,
						hasMore: querySearchResponse?.data?.resultsList?.has_more,
					}}
					updateHandler={pageSelectionHandler}
					currentPage={page}
				/>
			)}

			<QueryResult queryResult={querySearchResponse as QueryResultData}>
				<ScryfallSearchResults
					cardData={querySearchResponse.data}
					clickHandler={searchCardNameHandler}
				/>
			</QueryResult>
		</>
	);
}
