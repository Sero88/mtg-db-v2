import { SearchFieldNames } from "@/types/search";

type SearchNameProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string;
	};
	changeHandler: (fieldName: SearchFieldNames, value: any) => void;
};

export function CardName({ changeHandler, fieldData }: SearchNameProps) {
	return (
		<>
			<h2>Card name</h2>
			<label>
				<input
					name={fieldData?.name}
					onChange={(event) => changeHandler(fieldData?.name, event.target.value)}
					value={fieldData?.value}
					autoComplete="off"
				/>
				<br />
			</label>
		</>
	);
}
