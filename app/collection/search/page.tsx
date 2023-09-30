"use client";
import { CardName } from "@/components/search/fields/CardName";
import { SearchFields } from "@/types/search";
import { useState } from "react";
import styles from "@/styles/collectionSearchResults.module.scss";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { CollectionSearchResults } from "@/components/search/CollectionSearchResults";
import { QueryResultData } from "@/types/queryResult";
import { QueryResult } from "@/components/utils/QueryResult";

export default function SearchPage() {
	const initialFormFields = {
		[SearchFields.NAME]: "",
	};
	const [formFields, setFormFields] = useState(initialFormFields);
	const searchResponse = useCollectionCardSearch(formFields);

	const updateHandler = (fieldName: SearchFields, value: any) => {
		setFormFields({
			...formFields,
			[fieldName]: value,
		});
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (searchResponse?.isLoading) {
			return;
		}

		searchResponse.refetch();
		console.log(formFields);
	};

	return (
		<>
			<h1>Search Collection</h1>
			<form onSubmit={submitHandler} className={styles.searchForm} data-testid="searchForm">
				<div className="form-section">
					<CardName
						fieldData={{
							name: SearchFields.NAME,
							value: formFields[SearchFields.NAME],
						}}
						changeHandler={updateHandler}
					/>
				</div>
				<hr />
			</form>
			<QueryResult queryResult={searchResponse as QueryResultData}>
				<CollectionSearchResults cardData={searchResponse.data} />
			</QueryResult>
		</>
	);
}
