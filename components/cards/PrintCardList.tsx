import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/results.module.scss";
import { helpers } from "@/utils/helpers";
import { PrintCard } from "./PrintCard";
import { useGetCollectionCardQuantityById } from "@/hooks/useGetCollectionCardQuantityById";
import { useMemo } from "react";

type PrintCardListProps = {
	cardData: ScryfallCard[];
};
export function PrintCardList({ cardData }: PrintCardListProps) {
	const cardIds = cardData.map((card: ScryfallCard) => card.id);
	const { data: cardQuantities } = useGetCollectionCardQuantityById(cardIds);

	const mappedCardQuantities = useMemo(() => {
		return helpers.mapIdWithQuantities(cardQuantities);
	}, [cardQuantities]);

	return (
		<>
			<ul className={styles.resultsList} data-testid="printCardList">
				{cardData.map((card, index) => {
					const cardQuantities = mappedCardQuantities.get(card.id);
					return (
						<li
							id={helpers.convertNameToHtmlId(card.name)}
							className={styles.cardWrapper}
							key={index}
						>
							<PrintCard data={card} collectionQuantity={cardQuantities} />
						</li>
					);
				})}
			</ul>
		</>
	);
}
