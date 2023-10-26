import { CollectionCard } from "@/types/collection";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import { CardImage } from "./CardImage";
import styles from "@/styles/collectionCardModal.module.scss";
import { CardType } from "@/types/card";

type CollectionCardImagesProps = {
	card: CollectionCard;
};

export function CollectionCardImages({ card }: CollectionCardImagesProps) {
	const images = CollectionCardUtil.getDefaultSearchCardImages(card);

	return (
		<div className={styles.cardImages}>
			{images?.map((image, index) => (
				<CardImage
					key={`${card?.name}-${index}`}
					imageUri={image || "/images/not-available.png"}
					name={card?.name!}
					type={CardType.COLLECTION}
				/>
			))}
		</div>
	);
}
