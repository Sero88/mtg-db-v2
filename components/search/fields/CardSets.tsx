import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionSetsContext } from "@/contexts/CollectionSetsContext";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";
import { SearchFieldNames } from "@/types/search";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardSets.module.scss";
import { SelectorListItem } from "@/types/searchSelector";
import { SelectedList } from "@/components/utils/SelectedList";
import { createSetsArray } from "@/components/utils/CardSetUtil";

type CardSetsProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string[];
	};
	changeHandler: (value: any) => void;
};

export function CardSets({ changeHandler, fieldData }: CardSetsProps) {
	const [selectedSets, setSelectedSets] = useState([] as SelectorListItem[]);

	const scryfallSets = useContext(ScryfallSetDataContext);
	const collectionSets = useContext(CollectionSetsContext);

	const searchSetSelectorList = useMemo(
		() => createSetsArray(scryfallSets, collectionSets),
		[collectionSets, scryfallSets]
	);

	const searchSelectorClickHandler = (newSelectedItem: SelectorListItem) => {
		const duplicates = selectedSets.filter(
			(previousSelectedSet) => newSelectedItem.value === previousSelectedSet.value
		);

		if (duplicates.length > 0) {
			return;
		}

		updateSets([...selectedSets, newSelectedItem]);
	};

	const updateSets = (newSelectedSets: SelectorListItem[]) => {
		setSelectedSets(newSelectedSets);
		changeHandler(newSelectedSets.map((set) => set.value));
	};

	const removeHandler = (itemToRemove: string) => {
		const indexOfItemToDelete = selectedSets.findIndex((set) => {
			set.value === itemToRemove;
		});
		const newSelection = [...selectedSets];
		newSelection.splice(indexOfItemToDelete, 1);
		updateSets(newSelection);
	};

	return (
		<>
			<h2>Card Sets</h2>
			<div className={styles.cardTypes}>
				<SelectedList list={selectedSets} removeHandler={removeHandler} />
				<SearchSelector
					items={searchSetSelectorList}
					clickHandler={searchSelectorClickHandler}
				/>
			</div>
		</>
	);
}
