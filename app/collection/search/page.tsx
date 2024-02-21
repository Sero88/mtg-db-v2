"use client";
import { CardName } from "@/components/search/fields/CardName";
import { SearchFields, SelectorListType } from "@/types/search";
import { useState } from "react";
import styles from "@/styles/collectionSearchResults.module.scss";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { CollectionSearchResults } from "@/components/search/CollectionSearchResults";
import { QueryResultData } from "@/types/queryResult";
import { QueryResult } from "@/components/utils/QueryResult";
import { CardText } from "@/components/search/fields/CardText";
import { CardTypes } from "@/components/search/fields/CardTypes";

export default function SearchPage() {
	const initialFormFields = {
		[SearchFields.NAME]: "",
		[SearchFields.TEXT]: "",
		[SearchFields.TYPES]: {} as SelectorListType,
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
				<div className="form-section">
					<CardText
						fieldData={{
							name: SearchFields.TEXT,
							value: formFields[SearchFields.TEXT],
						}}
						changeHandler={updateHandler}
					/>
				</div>

				<div className="form-section">
					<CardTypes
						fieldData={{
							name: SearchFields.TYPES,
							value: formFields[SearchFields.TYPES],
						}}
					/>
				</div>
			</form>
			<QueryResult queryResult={searchResponse as QueryResultData}>
				<CollectionSearchResults cardData={searchResponse.data} />
			</QueryResult>
		</>
	);
}
