import { CardText } from "@/components/search/fields/CardText";
import { CardTypes } from "@/components/search/fields/CardTypes";
import { CardName } from "@/components/search/fields/CardName";
import {
	CardStatType,
	ColorsSelectorType,
	SearchFieldNames,
	SearchFields,
	SelectorListType,
} from "@/types/search";
import styles from "@/styles/collectionSearchResults.module.scss";
import { useState } from "react";
import { CardColors } from "./fields/CardColors";
import { CardStats } from "./fields/CardStats";

type SearchCollectionFormProps = {
	searchHandler: (updatedFields: SearchFields) => void;
};

export function CollectionSearchForm({ searchHandler }: SearchCollectionFormProps) {
	const initialFormFields = {
		[SearchFieldNames.NAME]: "",
		[SearchFieldNames.TEXT]: "",
		[SearchFieldNames.TYPES]: {} as SelectorListType,
		[SearchFieldNames.COLORS]: {} as ColorsSelectorType,
		[SearchFieldNames.STATS]: [] as CardStatType[],
	};
	const [formFields, setFormFields] = useState(initialFormFields);

	const updateHandler = (fieldName: SearchFieldNames, value: any) => {
		setFormFields({
			...formFields,
			[fieldName]: value,
		});
	};

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		searchHandler(formFields);
	};

	return (
		<form onSubmit={submitHandler} className={styles.searchForm} data-testid="searchForm">
			<div className="form-section">
				<CardName
					fieldData={{
						name: SearchFieldNames.NAME,
						value: formFields[SearchFieldNames.NAME],
					}}
					changeHandler={updateHandler}
				/>
			</div>
			<hr />
			<div className="form-section">
				<CardText
					fieldData={{
						name: SearchFieldNames.TEXT,
						value: formFields[SearchFieldNames.TEXT],
					}}
					changeHandler={updateHandler}
				/>
			</div>
			<hr />
			<div className="form-section">
				<CardTypes
					fieldData={{
						name: SearchFieldNames.TYPES,
						value: formFields[SearchFieldNames.TYPES],
					}}
					changeHandler={updateHandler}
				/>
			</div>
			<hr />
			<div className="form-section">
				<CardColors
					fieldData={{
						name: SearchFieldNames.COLORS,
						value: formFields[SearchFieldNames.COLORS],
					}}
					changeHandler={updateHandler}
				/>
			</div>
			<hr />
			<div className="form-section">
				<CardStats
					fieldData={{
						name: SearchFieldNames.STATS,
						value: formFields[SearchFieldNames.STATS],
					}}
					changeHandler={(value) => updateHandler(SearchFieldNames.STATS, value)}
				/>
			</div>
			<button type="submit">Test</button>
		</form>
	);
}
