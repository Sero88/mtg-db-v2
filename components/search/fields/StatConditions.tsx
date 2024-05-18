import { StatConditionalEnums } from "@/types/search";

type StatConditionProps = {
	conditionalValue: StatConditionalEnums;
	handleStatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export function StatConditions({ conditionalValue, handleStatChange }: StatConditionProps) {
	return (
		<select value={conditionalValue} onChange={handleStatChange}>
			<option value={StatConditionalEnums.eq}> = (Equal)</option>
			<option value={StatConditionalEnums.ne}> ≠ (Not Equal)</option>
			<option value={StatConditionalEnums.gt}> &gt; (Greater Than)</option>
			<option value={StatConditionalEnums.gte}> &gt;= (Greater Than or Equal)</option>
			<option value={StatConditionalEnums.lt}> &lt; (Less Than)</option>
			<option value={StatConditionalEnums.lte}>&lt;= (Less Than or Equal)</option>
		</select>
	);
}
