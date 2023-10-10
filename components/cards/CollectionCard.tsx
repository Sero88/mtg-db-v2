import { CardCollectionVersion, CollectionCard } from "@/types/collection";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import styles from "@/styles/card.module.scss";
import { CardImage } from "./CardImage";
import { CardType } from "@/types/card";

type CollectionCardProps = {
	data: CollectionCard;
};

export function CollectionCard({ data }: CollectionCardProps) {
	const imageUri = CollectionCardUtil.getVersionCardImage(data, CardCollectionVersion.NO_PROMO);

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper}>
				<CardImage imageUri={imageUri ?? ""} name={data.name} type={CardType.COLLECTION} />
			</div>
			{data.name}
		</div>
	);
}
