import { IsNotSelector } from "@/components/utils/IsNotSelector";
import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";
import { IsNotSelectorItem } from "@/types/isNotSelector";
import { SearchFieldNames, SelectorListType } from "@/types/search";
import { useContext, useMemo, useState } from "react";
import styles from "@/styles/cardTypes.module.scss";

type CardTypesProps = {
	fieldData: {
		name: SearchFieldNames;
		value: SelectorListType;
	};
	changeHandler: (fieldName: SearchFieldNames, value: SelectorListType) => void;
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

	const searchSelectorClickHandler = (selectedItem: string) => {
		if (selectedTypes.get(selectedItem)) {
			return;
		}
		const newSelectedTypes = new Map(selectedTypes);
		newSelectedTypes.set(selectedItem, { is: true, value: selectedItem });

		setSelectedTypes(newSelectedTypes);
		changeHandler(fieldData.name, {
			items: Array.from(newSelectedTypes.values()),
			allowPartials,
		});
	};

	const updateSelectedTypes = (newSelectedTypes: Map<String, IsNotSelectorItem>) => {
		setSelectedTypes(new Map(newSelectedTypes));
		changeHandler(fieldData.name, {
			items: Array.from(newSelectedTypes.values()),
			allowPartials,
		});
	};

	const updateAllowPartials = () => {
		const newAllowPartials = !allowPartials;
		setAllowPartials(newAllowPartials);
		changeHandler(fieldData.name, {
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
					<label>
						<input
							type="checkbox"
							checked={allowPartials}
							onChange={updateAllowPartials}
						/>
						Allow partial types <span>(search will use OR instead of AND)</span>
					</label>
				</div>
				<SearchSelector
					items={typesSelectorList}
					clickHandler={searchSelectorClickHandler}
				/>
			</div>
		</>
	);
}