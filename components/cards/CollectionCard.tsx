import { CollectionCard as CollectionCardType } from "@/types/collection";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import styles from "@/styles/card.module.scss";
import { CardImage } from "./CardImage";
import { CardType } from "@/types/card";
import stylesCard from "@/styles/card.module.scss";

type CollectionCardProps = {
	card: CollectionCardType;
	clickHandler: (card: CollectionCardType) => void;
};

export function CollectionCard({ card, clickHandler }: CollectionCardProps) {
	const images = CollectionCardUtil.getDefaultSearchCardImages(card);

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper} onClick={() => clickHandler(card)}>
				<CardImage imageUri={images?.[0]} name={card.name} type={CardType.COLLECTION} />
			</div>
			<div className={stylesCard.cardDetails}>
				<p>
					<strong className={stylesCard.cardNameLink} onClick={() => clickHandler(card)}>
						{card.name}
					</strong>
				</p>
			</div>
		</div>
	);
}
