import { CardRarityEnum } from "@/types/card";
import { SearchFieldNames } from "@/types/search";
import { useState } from "react";

type CardRarityProps = {
	fieldData: {
		name: SearchFieldNames;
		value: string[];
	};
	changeHandler: (value: any) => void;
};
export function CardRarity({ changeHandler, fieldData }: CardRarityProps) {
	const rarities = [];
	const [selectedRarities, setSelectedSRarities] = useState(new Set());

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, rarity: CardRarityEnum) => {
		const newSetSelection = new Set(selectedRarities);
		if (e.target.checked) {
			newSetSelection.add(rarity);
		} else {
			newSetSelection.delete(rarity);
		}
		setSelectedSRarities(newSetSelection);
	};

	for (const rarityEnum in CardRarityEnum) {
		const rarity = parseInt(rarityEnum);

		//verify rarity has a number value (from enum)
		if (isNaN(rarity)) {
			continue;
		}

		//create the checkboxes
		rarities.push(
			<label key={rarity}>
				<input
					type="checkbox"
					data-value={rarity}
					checked={selectedRarities.has(rarity)}
					onChange={(e) => onChangeHandler(e, rarity)}
				/>
				<span>
					{rarity == CardRarityEnum.specialBonus
						? "Special/Bonus"
						: CardRarityEnum[rarity]}
				</span>
			</label>
		);
	}

	return (
		<>
			<h2>Card Rarity</h2>
			<div>
				<div>{rarities}</div>
			</div>
		</>
	);
}
