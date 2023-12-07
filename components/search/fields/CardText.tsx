import { SearchFields } from "@/types/search";

type CardTextProps = {
	fieldData: {
		name: SearchFields;
		value: string;
	};
	changeHandler: (fieldName: SearchFields, value: any) => void;
};

export function CardText({ changeHandler, fieldData }: CardTextProps) {
	return (
		<>
			<label>
				<input
					name={fieldData?.name}
					onChange={(event) => changeHandler(fieldData?.name, event?.target?.value)}
					value={fieldData?.value}
				/>
				<br />
				Text
			</label>
		</>
	);
}
