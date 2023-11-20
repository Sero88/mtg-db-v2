import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/card.module.scss";

type CardDetailsProps = {
	card: ScryfallCard;
	clickHandler: Function;
};
export function GeneralCardDetails({ card, clickHandler }: CardDetailsProps) {
	return (
		<div className={styles.cardDetails}>
			<p>
				<strong className={styles.cardNameLink} onClick={() => clickHandler(card.name)}>
					{card.name}
				</strong>
			</p>
		</div>
	);
}
