import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/results.module.scss";
import { ScryfallResultsTypeEnum } from "@/types/scryfall";
import { CardListItems } from "./CardListItems";

type GeneralCardListProps = {
	cardData: ScryfallCard[];
	clickHandler: Function;
};
export function GeneralCardList({ cardData, clickHandler }: GeneralCardListProps) {
	return (
		<>
			<ul className={styles.resultsList}>
				<CardListItems
					cards={cardData}
					type={ScryfallResultsTypeEnum.GENERAL}
					clickHandler={clickHandler}
				/>
			</ul>
		</>
	);
}
