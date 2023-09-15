"use client";
import { CardName } from "@/components/search/fields/CardName";
import { SearchFields } from "@/types/search";
import { useState } from "react";
import styles from "@/styles/collectionSearchResults.module.scss";

export default function SearchPage() {
	const initialFormFields = {
		[SearchFields.NAME]: "",
	};
	const [formFields, setFormFields] = useState(initialFormFields);

	const updateHandler = (fieldName: SearchFields, value: any) => {
		setFormFields({
			...formFields,
			[fieldName]: value,
		});
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(formFields);
	};

	return (
		<>
			<h1>Search Collection</h1>
			<form onSubmit={submitHandler} className={styles.searchForm}>
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
		</>
	);
}
