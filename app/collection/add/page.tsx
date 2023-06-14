"use client";
import React, { useState } from "react";
import { ScryfallSearchResults } from "@/components/scryfall/ScryfallSearchResults";
import { ScryfallSearchForm } from "@/components/scryfall/scryfallSearchForm/ScryfallSearchForm";
import { ScryfallResultsTypeEnum, ScryfallSearchCardData } from "@/types/scryfall";
import { QueryResult } from "@/components/utils/QueryResult";
import { useScryfallCardSearch } from "@/hooks/useScryfallCardSearch";
import { QueryResultData } from "@/types/queryResult";
import { Pagination } from "@/components/utils/Pagination";

export default function AddPage() {
	const [searchCardData, setSearchCardData] = useState<ScryfallSearchCardData>({
		cardName: "",
		setCode: "",
	});

	const [page, setPage] = useState(1);
	const querySearchResponse = useScryfallCardSearch({ searchCardData, page });

	const handleSearchFormSubmit = (newSearchCardData: ScryfallSearchCardData) => {
		setSearchCardData({ ...newSearchCardData });
		setPage(1);
	};

	const searchCardNameHandler = (cardName: string) => {
		handleSearchFormSubmit({ ...searchCardData, cardName });
	};

	const pageSelectionHandler = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
			<h1>Add Cards</h1>
			<ScryfallSearchForm
				onSubmitSearch={handleSearchFormSubmit}
				disabled={querySearchResponse.isLoading}
			/>

			{querySearchResponse?.data?.type === ScryfallResultsTypeEnum.GENERAL && (
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
