import styles from "@/styles/card.module.scss";
import { ScryfallCard } from "@/types/scryfall";
import { CardImage } from "./CardImage";
import { GeneralCardDetails } from "./GeneralCardDetails";
import { CardType } from "@/types/card";

type GeneralCardProps = {
	card: ScryfallCard;
	clickHandler: Function;
};

export function GeneralCard({ card, clickHandler }: GeneralCardProps) {
	const cardImageUrl = card.image_uris?.normal
		? card.image_uris?.normal
		: card.card_faces?.[0].image_uris?.normal;

	return (
		<div className={styles.card}>
			<div className={styles.imageCollectionWrapper} onClick={() => clickHandler(card.name)}>
				<CardImage
					imageUri={cardImageUrl}
					name={card.name}
					type={CardType.SCRYFALL_GENERAL}
				/>
			</div>
			<GeneralCardDetails card={card} clickHandler={clickHandler} />
		</div>
	);
}
