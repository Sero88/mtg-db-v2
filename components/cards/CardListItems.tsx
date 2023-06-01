import { ScryfallCard, ScryfallResultsTypeEnum } from "@/types/scryfall";
import { helpers } from "@/utils/helpers";
import { GeneralCard } from "./GeneralCard";
import styles from "@/styles/results.module.scss";
import { PrintCard } from "./PrintCard";

type CardListItems = {
	cards: ScryfallCard[];
	type: ScryfallResultsTypeEnum;
	clickHandler: Function;
};
export function CardListItems({ cards, type, clickHandler }: CardListItems) {
	const listOfCards = cards?.map((card: ScryfallCard, index) => {
		return type === ScryfallResultsTypeEnum.GENERAL ? (
			<li id={helpers.convertNameToId(card.name)} className={styles.cardWrapper} key={index}>
				<GeneralCard data={card} clickHandler={clickHandler} />
			</li>
		) : (
			<li className={styles.cardWrapper} key={index}>
				<PrintCard data={card} />
			</li>
		);
	});

	return <>{listOfCards}</>;
}
