import { CardCollectionVersion, CollectionCard as CollectionCardType } from "@/types/collection";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import styles from "@/styles/card.module.scss";
import { CardImage } from "./CardImage";
import { CardType } from "@/types/card";
import stylesCard from "@/styles/card.module.scss";

type CollectionCardProps = {
	data: CollectionCardType;
	clickHandler: (card: CollectionCardType) => void;
};

export function CollectionCard({ data, clickHandler }: CollectionCardProps) {
	const imageUri = CollectionCardUtil.getVersionCardImage(data, CardCollectionVersion.NO_PROMO);

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper} onClick={() => clickHandler(data)}>
				<CardImage imageUri={imageUri ?? ""} name={data.name} type={CardType.COLLECTION} />
			</div>
			<div className={stylesCard.cardDetails}>
				<p>
					<strong className={stylesCard.cardNameLink} onClick={() => clickHandler(data)}>
						{data.name}
					</strong>
				</p>
			</div>
		</div>
	);
}
