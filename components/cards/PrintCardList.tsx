import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/results.module.scss";
import { helpers } from "@/utils/helpers";
import { PrintCard } from "./PrintCard";

type PrintCardListProps = {
	cardData: ScryfallCard[];
};
export function PrintCardList({ cardData }: PrintCardListProps) {
	return (
		<>
			<ul className={styles.resultsList}>
				{cardData.map((card, index) => {
					return (
						<li
							id={helpers.convertNameToHtmlId(card.name)}
							className={styles.cardWrapper}
							key={index}
						>
							<PrintCard data={card} />
						</li>
					);
				})}
			</ul>
		</>
	);
}
