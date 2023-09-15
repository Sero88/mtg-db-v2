import { SearchFields } from "@/types/search";

type SearchNameProps = {
	fieldData: {
		name: SearchFields;
		value: string;
	};
	changeHandler: (fieldName: SearchFields, value: any) => void;
};

export function CardName({ changeHandler, fieldData }: SearchNameProps) {
	return (
		<label>
			<input
				name={fieldData.name}
				onChange={(event) => changeHandler(fieldData?.name, event.target.value)}
				value={fieldData.value}
				autoComplete="off"
			/>
			<br />
			Card name
		</label>
	);
}
