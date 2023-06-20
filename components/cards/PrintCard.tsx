import { ScryfallCard, ScryfallResultsTypeEnum } from "@/types/scryfall";
import { CardImage } from "./CardImage";
import styles from "@/styles/card.module.scss";
import { PrintCardDetails } from "./PrintCardDetails";

type PrintCardProps = {
	data: ScryfallCard;
};

export function PrintCard({ data }: PrintCardProps) {
	const cardImageUrl = data.image_uris?.normal
		? data.image_uris?.normal
		: data.card_faces?.[0].image_uris?.normal;

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper}>
				<CardImage
					imageUri={cardImageUrl ?? ""}
					name={data.name}
					type={ScryfallResultsTypeEnum.PRINT}
				/>
			</div>
			<PrintCardDetails data={data} />
		</div>
	);
}
