import { ScryfallSymbolDataContext } from "@/contexts/ScryfallSymbolDataContext";
import { ColorsSelectorType, SearchFieldNames } from "@/types/search";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { ScryfallUtil } from "@/utils/scryfallUtil";
import styles from "@/styles/colorChoices.module.scss";

type CardColorProps = {
	fieldData: {
		name: SearchFieldNames;
		value: ColorsSelectorType;
	};
	changeHandler: (fieldName: SearchFieldNames, value: ColorsSelectorType) => void;
};
export function CardColors({ fieldData, changeHandler }: CardColorProps) {
	const [selectedColors, setSelectedColors] = useState<string[]>([]);
	const symbols = useContext(ScryfallSymbolDataContext);

	const updateColorSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newSelectedColors = [...selectedColors];
		const value = event.target.value ? event.target.value : "";
		const checked = event.target?.checked ? event.target.checked : false;

		//if user chooses colorless remove the rest of the color selections or vise versa (cannot be color and colorless at the same time)
		if (checked && value == "null") {
			setSelectedColors(["null"]);
			return;
		} else {
			const colorlessPos = newSelectedColors?.indexOf("null");
			colorlessPos >= 0 ? newSelectedColors?.splice(colorlessPos, 1) : false;
		}

		//add or remove selected color
		if (checked) {
			newSelectedColors.push(value);
		} else {
			const valueToRemove = newSelectedColors.indexOf(value);
			newSelectedColors.splice(valueToRemove, 1);
		}

		setSelectedColors(newSelectedColors);
		//changeHandler(SearchFieldNames.COLORS, { selected: newSelectedColors, conditional: true });
	};

	const availableColors = useMemo(() => ScryfallUtil.extractColorSymbols(symbols), [symbols]);

	return (
		<>
			<h2>Card Colors</h2>
			<div className={styles.checkboxChoices}>
				{availableColors.map((color, index) => {
					return (
						<label key={`${color.value}-${index}`}>
							<input
								type="checkbox"
								value={color.value}
								name={fieldData.name}
								onChange={updateColorSelection}
								checked={selectedColors.includes(color.value)}
								data-testid={`color-${color.value}`}
							/>
							<Image src={color.uri} width={20} height={20} alt={color.value} />
						</label>
					);
				})}
			</div>
		</>
	);
}
