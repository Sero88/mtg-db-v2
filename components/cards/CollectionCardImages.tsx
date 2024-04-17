import { Version } from "@/types/collection";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import { CardImage } from "./CardImage";
import styles from "@/styles/collectionCardModal.module.scss";
import { CardType } from "@/types/card";

type CollectionCardImagesProps = {
	cardName: string;
	version: Version;
	cardType?: CardType;
};

export function CollectionCardImages({
	version,
	cardName,
	cardType = CardType.COLLECTION,
}: CollectionCardImagesProps) {
	const images = CollectionCardUtil.getVersionCardImages(version);

	return (
		<div className={styles.cardImages}>
			{images?.map((image, index) => (
				<CardImage
					key={`${version?.scryfallId}-${index}`}
					imageUri={image}
					name={cardName}
					type={cardType}
				/>
			))}
		</div>
	);
}
