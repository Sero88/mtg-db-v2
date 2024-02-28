import { SearchSelector } from "@/components/utils/SearchSelector";
import { CollectionTypesContext } from "@/contexts/CollectionTypesContext";
import { SearchFields, SelectorListType } from "@/types/search";
import { SelectorListItem } from "@/types/searchSelector";
import { useContext, useMemo } from "react";

type CardTypesProps = {
	fieldData: {
		name: SearchFields;
		value: SelectorListType;
	};
};
export function CardTypes({ fieldData }: CardTypesProps) {
	const types = useContext(CollectionTypesContext);
	const typesSelectorList = useMemo(() => {
		if (!types) {
			return [] as SelectorListItem[];
		}
		return types?.map((type) => ({
			display: type,
			value: type,
		}));
	}, [types]);

	return (
		<>
			<div>
				<label>
					<div>Types go here</div>
					<br />
					Card Types
				</label>
			</div>

			<SearchSelector items={typesSelectorList} clickHandler={() => {}} />
		</>
	);
}
