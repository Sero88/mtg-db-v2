import { CardRarityEnum } from "@/types/card";
import { SearchFieldNames } from "@/types/search";
import { useState } from "react";

type CardRarityProps = {
	fieldData: {
		name: SearchFieldNames;
		value: number[];
	};
	changeHandler: (newSelection: number[]) => void;
};

export function CardRarity({ changeHandler, fieldData }: CardRarityProps) {
	const rarities = [];
	const [selectedRarities, setSelectedSRarities] = useState(new Set<number>());

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, rarity: CardRarityEnum) => {
		const newSetSelection = new Set(selectedRarities);
		if (e.target.checked) {
			newSetSelection.add(rarity);
		} else {
			newSetSelection.delete(rarity);
		}
		setSelectedSRarities(newSetSelection);
		changeHandler(Array.from(newSetSelection));
	};

	for (const rarityEnum in CardRarityEnum) {
		const rarity = parseInt(rarityEnum);

		//verify rarity has a number value (from enum)
		if (isNaN(rarity)) {
			continue;
		}

		//create the checkboxes
		rarities.push(
			<li key={rarity}>
				<label>
					<input
						type="checkbox"
						checked={selectedRarities.has(rarity)}
						onChange={(e) => onChangeHandler(e, rarity)}
					/>
					<span>
						{rarity == CardRarityEnum.specialBonus
							? "Special/Bonus"
							: CardRarityEnum[rarity]}
					</span>
				</label>
			</li>
		);
	}

	return (
		<>
			<h2>Card Rarity</h2>
			<ul>{rarities}</ul>
		</>
	);
}
