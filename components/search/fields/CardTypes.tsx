import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";
import { IsNotSelectorItem } from "@/types/isNotSelector";
import { SearchFields, SelectorListType } from "@/types/search";
import { SelectorListItem } from "@/types/searchSelector";
import { useContext, useMemo, useState } from "react";

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
		if (!selectedTypes.get(selectedItem)) {
			selectedTypes.set(selectedItem, { is: true, value: selectedItem });
		}
	};

	return (
		<>
			<SearchSelector items={typesSelectorList} clickHandler={searchSelectorClickHandler} />
		</>
	);
}
