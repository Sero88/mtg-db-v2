import styles from "@/styles/card.module.scss";
import { ScryfallResultsTypeEnum, ScryfallCard } from "@/types/scryfall";
import { CardImage } from "./CardImage";
import { GeneralCardDetails } from "./GeneralCardDetails";

type GeneralCardProps = {
	data: ScryfallCard;
	clickHandler: Function;
};

export function GeneralCard({ data, clickHandler }: GeneralCardProps) {
	const cardImageUrl = data.image_uris?.normal
		? data.image_uris?.normal
		: data.card_faces?.[0].image_uris?.normal;

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper} onClick={() => clickHandler(data.name)}>
				<CardImage
					imageUri={cardImageUrl ?? ""}
					name={data.name}
					type={ScryfallResultsTypeEnum.GENERAL}
				/>
			</div>
			<GeneralCardDetails data={data} clickHandler={clickHandler} />
		</div>
	);
}
