import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionSetsContext } from "@/contexts/CollectionSetsContext";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";
import { SearchFieldNames } from "@/types/search";
import { SetUtil } from "@/utils/setUtil";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardSets.module.scss";
import { SelectorListItem } from "@/types/searchSelector";
import { SelectedList } from "@/components/utils/SelectedList";

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

	const searchSetSelectorList = useMemo(() => {
		const searchSetSelectorList = [] as SelectorListItem[];
		for (const scryfallSet of scryfallSets) {
			if (searchSetSelectorList.length == collectionSets.length) {
				break;
			}

			if (!SetUtil.isAllowedSet(scryfallSet)) {
				continue;
			}

			collectionSets.forEach((set: string) => {
				// scryfall broke the 3 letter mtg set convetion, so some sets on scryfall have more than 3 letters such as hrt20
				// parent_set_code is set for scryfall sets such as promo and tokens, the parent is the set we want, so ignore the child
				// lastly, if none of the above worked, convert the set into three letters and check againts it
				if (
					scryfallSet.code == set ||
					(!scryfallSet.parent_set_code && SetUtil.getCardSet(scryfallSet.code) == set)
				) {
					searchSetSelectorList.push({
						display: <p>{scryfallSet.name}</p>,
						value: set,
						searchValue: scryfallSet.name,
					});
				}
			});
		}
		return searchSetSelectorList;
	}, [collectionSets, scryfallSets]);

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
