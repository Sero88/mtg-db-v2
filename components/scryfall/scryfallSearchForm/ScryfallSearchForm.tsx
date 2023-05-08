import { useState } from "react";
import { ScryfallSearchCardData } from "@/types/scryfall";
import { NameSearch } from "./NameSearch";
import { SetSearch } from "./SetSearch";

type SearchFormProps = {
	onSubmitSearch: (searchCardData: ScryfallSearchCardData) => void;
	disabled: boolean;
};
export function ScryfallSearchForm({ onSubmitSearch, disabled }: SearchFormProps) {
	const [searchCardData, setSearchCardData] = useState<ScryfallSearchCardData>({
		cardName: "",
		setCode: "",
	});

	const selectedSetHandler = (newSetCode: string) => {
		setSearchCardData({ ...searchCardData, setCode: newSetCode });
	};

	const cardNameChange = (newCardName: string) => {
		setSearchCardData({ ...searchCardData, cardName: newCardName });
	};

	const onFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (disabled) {
			return;
		}

		onSubmitSearch({ ...searchCardData });
	};

	return (
		<form onSubmit={onFormSubmit} data-testid="addSearchForm">
			<SetSearch selectedSet={searchCardData.setCode} setChangeHandler={selectedSetHandler} />
			<NameSearch cardName={searchCardData.cardName} cardNameChange={cardNameChange} />
			<button onClick={onFormSubmit} disabled={disabled}>
				Search
			</button>
		</form>
	);
}
