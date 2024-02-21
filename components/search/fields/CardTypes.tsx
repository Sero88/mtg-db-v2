import { SearchSelector } from "@/components/utils/SearchSelector";
import { SearchFields, SelectorListType } from "@/types/search";

type CardTypesProps = {
	fieldData: {
		name: SearchFields;
		value: SelectorListType;
	};
};
export function CardTypes({ fieldData }: CardTypesProps) {
	return (
		<>
			<div>
				<label>
					<div>Types go here</div>
					<br />
					Card Types
				</label>
			</div>
			<SearchSelector items={[]} clickHandler={() => {}} />
		</>
	);
}
