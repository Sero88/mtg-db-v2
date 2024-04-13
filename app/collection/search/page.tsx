"use client";
import { useState } from "react";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { CollectionSearchResults } from "@/components/search/CollectionSearchResults";
import { QueryResultData } from "@/types/queryResult";
import { QueryResult } from "@/components/utils/QueryResult";
import { CollectionSearchForm } from "@/components/search/CollectionSearchForm";
import { SearchFields } from "@/types/search";

export default function SearchPage() {
	const [searchFields, setSearchFields] = useState({} as SearchFields);
	const searchResponse = useCollectionCardSearch(searchFields);

	const searchHandler = (updatedFields: SearchFields) => {
		if (searchResponse?.isLoading) {
			return;
		}

		setSearchFields(updatedFields);
		console.log("search fields", updatedFields);
	};

	console.log("search response ==> ", searchResponse);

	return (
		<>
			<h1>Search Collection</h1>
			<CollectionSearchForm searchHandler={searchHandler} />
			<QueryResult queryResult={searchResponse as QueryResultData}>
				<CollectionSearchResults cardData={searchResponse.data} />
			</QueryResult>
		</>
	);
}
