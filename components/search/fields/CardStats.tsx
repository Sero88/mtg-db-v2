import { CardStatType, SearchFieldNames, StatConditionalEnums } from "@/types/search";
import { useState } from "react";
import { StatConditions } from "./StatConditions";
import styles from "@/styles/cardStats.module.scss";

type CardColorProps = {
	fieldData: {
		name: SearchFieldNames;
		value: CardStatType[];
	};
	changeHandler: (value: CardStatType[]) => void;
};

type StatField = { name: string; title: string };

export function CardStats({ changeHandler }: CardColorProps) {
	const [selectedStats, setSelectedStats] = useState(new Map<string, CardStatType>());
	const statFields: StatField[] = [
		{ name: "manaValue", title: "Mana Value" },
		{ name: "power", title: "Power" },
		{ name: "toughness", title: "Toughness" },
		{ name: "loyalty", title: "Loyalty" },
	];

	const handleStatChange = (
		statField: StatField,
		conditional: StatConditionalEnums,
		value: string
	) => {
		if (parseInt(value) > 99) {
			return;
		}
		const newStatData = {
			name: statField.name,
			conditional,
			value,
		};

		const newSelectedStats = new Map(selectedStats);
		newSelectedStats.set(statField.name, newStatData);

		setSelectedStats(newSelectedStats);
		changeHandler(Array.from(newSelectedStats.values()));
	};

	return (
		<div className={styles.statsWrapper}>
			<h2>Card Stats</h2>
			{statFields.map((stat, index) => {
				const statValue = selectedStats.get(stat.name)?.value ?? "";
				const conditionValue =
					selectedStats.get(stat.name)?.conditional ?? StatConditionalEnums.eq;

				return (
					<div data-name={stat.name} key={stat.name} className={styles.statField}>
						<fieldset className={styles.statLabel}>
							<legend className={styles.statLabelText} data-testid={`s-${stat.name}`}>
								{stat.title}
							</legend>
							<StatConditions
								conditionalValue={conditionValue}
								handleStatChange={(e) =>
									handleStatChange(
										stat,
										parseInt(e.target.value) as StatConditionalEnums,
										statValue
									)
								}
							/>
							<input
								type="number"
								onChange={(e) =>
									handleStatChange(stat, conditionValue, e.target.value)
								}
								value={statValue}
							/>
						</fieldset>
					</div>
				);
			})}
		</div>
	);
}
