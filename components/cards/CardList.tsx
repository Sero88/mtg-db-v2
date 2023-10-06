import styles from "@/styles/results.module.scss";
import { CollectionCard as CollectionCardType } from "@/types/collection";
import { ScryfallCard } from "@/types/scryfall";

type CardListProps = {
	cardData: CollectionCardType[] | ScryfallCard[];
	renderCard: (card: CollectionCardType | ScryfallCard) => JSX.Element;
};
export function CardList({ cardData, renderCard }: CardListProps) {
	return (
		<>
			<ul className={styles.resultsList}>
				{cardData.map((card, index) => {
					return (
						<li className={styles.cardWrapper} key={index}>
							{renderCard(card)}
						</li>
					);
				})}
			</ul>
		</>
	);
}
