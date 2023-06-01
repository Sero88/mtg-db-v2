import Image from "next/image";
import styles from "@/styles/card.module.scss";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";

type CardImageProps = {
	imageUri: string;
	name: string;
	type: ScryfallResultsTypeEnum;
};

export function CardImage({ imageUri, name, type }: CardImageProps) {
	const imageClass = type == ScryfallResultsTypeEnum.PRINT ? " " + styles.imagePrint : "";

	return (
		<Image
			src={imageUri}
			width={196}
			height={273}
			data-name={name}
			data-type={type}
			alt={name}
			className={styles.cardImage + imageClass}
			unoptimized={true}
		/>
	);
}
