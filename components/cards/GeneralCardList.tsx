import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/results.module.scss";
import { Helpers } from "@/utils/helpers";
import { GeneralCard } from "./GeneralCard";

type GeneralCardListProps = {
	cardData: ScryfallCard[];
	clickHandler: Function;
};
export function GeneralCardList({ cardData, clickHandler }: GeneralCardListProps) {
	return (
		<>
			<ul className={styles.resultsList}>
				{cardData.map((card, index) => {
					const cardId = Helpers.convertNameToHtmlId(card.name);
					return (
						<li id={cardId} className={styles.cardWrapper} key={index}>
							<GeneralCard
								card={card}
								clickHandler={() => clickHandler(card.name, cardId)}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
