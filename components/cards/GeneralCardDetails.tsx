import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/card.module.scss";

type CardDetailsProps = {
	data: ScryfallCard;
	clickHandler: Function;
};
export function GeneralCardDetails({ data, clickHandler }: CardDetailsProps) {
	return (
		<div className={styles.cardDetails}>
			<p>
				<strong className={styles.cardNameLink} onClick={() => clickHandler(data.name)}>
					{data.name}
				</strong>
			</p>
		</div>
	);
}
