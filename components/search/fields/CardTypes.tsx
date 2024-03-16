import { IsNotSelector } from "@/components/utils/IsNotSelector";
import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";
import { IsNotSelectorItem } from "@/types/isNotSelector";
import { SearchFields, SelectorListType } from "@/types/search";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardTypes.module.scss";

type CardTypesProps = {
	fieldData: {
		name: SearchFields;
		value: SelectorListType;
	};
};
export function CardTypes({ fieldData }: CardTypesProps) {
	const [selectedTypes, setSelectedTypes] = useState(new Map<String, IsNotSelectorItem>());

	const types = useContext(CollectionTypesContext);

	const typesSelectorList = useMemo(() => {
		return types.map((type) => ({
			display: type,
			value: type,
		}));
	}, [types]);

	const searchSelectorClickHandler = (selectedItem: string) => {
		if (selectedTypes.get(selectedItem)) {
			return;
		}
		const newSelectedTypes = new Map(selectedTypes);
		newSelectedTypes.set(selectedItem, { is: true, value: selectedItem });

		setSelectedTypes(newSelectedTypes);
	};

	const updateSelectedTypes = (newSelectedTypes: Map<String, IsNotSelectorItem>) => {
		setSelectedTypes(new Map(newSelectedTypes));
	};

	return (
		<div className={styles.cardTypes}>
			<IsNotSelector items={selectedTypes} updateTypes={updateSelectedTypes} />
			<SearchSelector items={typesSelectorList} clickHandler={searchSelectorClickHandler} />
		</div>
	);
}
