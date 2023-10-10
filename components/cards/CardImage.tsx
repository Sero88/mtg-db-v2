import Image from "next/image";
import styles from "@/styles/card.module.scss";
import { CardType } from "@/types/card";

type CardImageProps = {
	imageUri: string;
	name: string;
	type: CardType;
};

export function CardImage({ imageUri, name, type }: CardImageProps) {
	const imageClass = type == CardType.SCRYFALL_PRINT ? " " + styles.imagePrint : "";

	return (
		<div className={styles.cardWrapper}>
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
		</div>
	);
}
