import { SearchFieldNames } from "@/types/search";

type SearchNameProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string;
	};
	changeHandler: (value: any) => void;
};

export function CardName({ changeHandler, fieldData }: SearchNameProps) {
	return (
		<>
			<h2>Card Name</h2>
			<label>
				<input
					name={fieldData?.name}
					onChange={(event) => changeHandler(event.target.value)}
					value={fieldData?.value}
					autoComplete="off"
				/>
				<br />
			</label>
		</>
	);
}
