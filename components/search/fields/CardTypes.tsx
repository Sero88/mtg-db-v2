import { IsNotSelector } from "@/components/utils/IsNotSelector";
import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";
import { IsNotSelectorItem } from "@/types/isNotSelector";
import { SearchFieldNames, SelectorListType } from "@/types/search";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardTypes.module.scss";
import { SelectorListItem } from "@/types/searchSelector";

type CardTypesProps = {
	fieldData: {
		name: SearchFieldNames;
		value: SelectorListType;
	};
	changeHandler: (value: SelectorListType) => void;
};
export function CardTypes({ fieldData, changeHandler }: CardTypesProps) {
	const [selectedTypes, setSelectedTypes] = useState(new Map<String, IsNotSelectorItem>());
	const [allowPartials, setAllowPartials] = useState(false);

	const types = useContext(CollectionTypesContext);

	const typesSelectorList = useMemo(() => {
		return types.map((type) => ({
			display: type,
			value: type,
		}));
	}, [types]);

	const searchSelectorClickHandler = (selectedItem: SelectorListItem) => {
		if (selectedTypes.get(selectedItem.value)) {
			return;
		}
		const newSelectedTypes = new Map(selectedTypes);
		newSelectedTypes.set(selectedItem.value, { is: true, value: selectedItem.value });

		setSelectedTypes(newSelectedTypes);
		changeHandler({
			items: Array.from(newSelectedTypes.values()),
			allowPartials,
		});
	};

	const updateSelectedTypes = (newSelectedTypes: Map<String, IsNotSelectorItem>) => {
		setSelectedTypes(new Map(newSelectedTypes));
		changeHandler({
			items: Array.from(newSelectedTypes.values()),
			allowPartials,
		});
	};

	const updateAllowPartials = () => {
		const newAllowPartials = !allowPartials;
		setAllowPartials(newAllowPartials);
		changeHandler({
			items: Array.from(selectedTypes.values()),
			allowPartials: newAllowPartials,
		});
	};

	return (
		<>
			<h2>Card Types</h2>
			<div className={styles.cardTypes}>
				<div>
					<IsNotSelector items={selectedTypes} updateTypes={updateSelectedTypes} />
				</div>
				<SearchSelector
					items={typesSelectorList}
					clickHandler={searchSelectorClickHandler}
				/>
			</div>
			<label>
				<input type="checkbox" checked={allowPartials} onChange={updateAllowPartials} />
				Allow partial types <span>(search will use OR instead of AND)</span>
			</label>
		</>
	);
}
