import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionSetsContext } from "@/contexts/CollectionSetsContext";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";
import { CardSetDisplayItem, SearchFieldNames } from "@/types/search";
import { SetUtil } from "@/utils/setUtil";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardSets.module.scss";
import { SelectorListItem } from "@/types/searchSelector";
import { ScryfallSet } from "@/types/scryfall";

type CardSetsProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string[];
	};
	changeHandler: (value: any) => void;
};

export function CardSets({ changeHandler, fieldData }: CardSetsProps) {
	const [selectedSets, setSelectedSets] = useState(new Map<String, CardSetDisplayItem>());

	const scryfallSets = useContext(ScryfallSetDataContext);
	const collectionSets = useContext(CollectionSetsContext);

	const { searchSetSelectorList, searchSetMap } = useMemo(() => {
		const searchSetSelectorList = [] as SelectorListItem[];
		const searchSetMap = new Map<String, ScryfallSet>();
		for (const scryfallSet of scryfallSets) {
			if (searchSetSelectorList.length == collectionSets.length) {
				break;
			}

			if (SetUtil.isAllowedSet(scryfallSet)) {
				continue;
			}

			collectionSets.forEach((set: string) => {
				// scryfall broke the 3 letter mtg set convetion, so some sets on scryfall have more then 3 letters such as hrt20
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
					searchSetMap.set(set, scryfallSet);
				}
			});
		}
		return { searchSetSelectorList, searchSetMap };
	}, [collectionSets, scryfallSets]);

	const searchSelectorClickHandler = (selectedItem: string) => {
		// if (selectedSets.get(selectedItem)) {
		// 	return;
		// }

		// const selectedSet = searchSetMap.get(selectedItem);

		// const newSelectedTypes = new Map(selectedSets);
		// newSelectedTypes.set(selectedItem, {
		// 	iconUrl: selectedSet?.icon_svg_uri!,
		// 	name: selectedSet?.name!,
		// 	value: selectedItem,
		// });

		// setSelectedSets(newSelectedTypes);
		// changeHandler({
		// 	items: Array.from(newSelectedTypes.values()),
		// });
		changeHandler(["test"]);
	};
	return (
		<>
			<h2>Card Sets</h2>
			<div className={styles.cardTypes}>
				<div></div>
				<SearchSelector
					items={searchSetSelectorList}
					clickHandler={searchSelectorClickHandler}
				/>
			</div>
		</>
	);
}
