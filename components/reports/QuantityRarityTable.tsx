import { CardRarityEnum } from "@/types/card";
import styles from "@/styles/quantityRarityTable.module.scss";

export function QuantityRarityTable({ reportData }: { reportData: { [key: string]: any } }) {
	const rarityHeaders = [];
	const quantityByRarities = [];
	let index = 0;
	for (let rarityEnum in CardRarityEnum) {
		if (!isNaN(parseInt(rarityEnum))) {
			continue;
		}

		if (rarityEnum == CardRarityEnum[CardRarityEnum.specialBonus]) {
			rarityEnum = "special";
			quantityByRarities.push(<td key={index}>{reportData.quantity.rarity[rarityEnum]}</td>);
			rarityHeaders.push(<th key={index}>{rarityEnum}</th>);

			index++;

			rarityEnum = "bonus";
			quantityByRarities.push(<td key={index}>{reportData.quantity.rarity[rarityEnum]}</td>);
			rarityHeaders.push(<th key={index}>{rarityEnum}</th>);
		} else {
			quantityByRarities.push(<td key={index}>{reportData.quantity.rarity[rarityEnum]}</td>);
			rarityHeaders.push(<th key={index}>{rarityEnum}</th>);
		}
		index++;
	}

	return (
		<table className={styles.quantityRarityTable}>
			<thead>
				<tr data-testid="tableHeaderRow">{rarityHeaders}</tr>
			</thead>
			<tbody>
				<tr data-testid="tableBodyRow">{quantityByRarities}</tr>
			</tbody>
		</table>
	);
}
