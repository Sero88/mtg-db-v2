import { ScryfallCard } from "@/types/scryfall";
import { CardImage } from "./CardImage";
import styles from "@/styles/card.module.scss";
import { PrintCardDetails } from "./PrintCardDetails";
import { CollectionCardQuantity } from "@/types/collection";
import { CollectionCardMenu } from "./CollectionCardMenu";
import { CardType } from "@/types/card";

type PrintCardProps = {
	data: ScryfallCard;
	collectionQuantity: CollectionCardQuantity;
};

export function PrintCard({ data, collectionQuantity }: PrintCardProps) {
	const cardImageUrl = data?.image_uris?.normal
		? data?.image_uris?.normal
		: data?.card_faces?.[0].image_uris?.normal;

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper}>
				<CardImage
					imageUri={cardImageUrl ?? ""}
					name={data.name}
					type={CardType.SCRYFALL_PRINT}
				/>
				<CollectionCardMenu quantity={collectionQuantity} cardData={data} />
			</div>
			<PrintCardDetails data={data} />
		</div>
	);
}
