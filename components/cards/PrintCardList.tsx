import { ScryfallCard } from "@/types/scryfall";
import styles from "@/styles/results.module.scss";
import { Helpers } from "@/utils/helpers";
import { PrintCard } from "./PrintCard";
import { useGetCollectionCardQuantityById } from "@/hooks/useGetCollectionCardQuantityById";
import { useMemo } from "react";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
import { Loader } from "../utils/Loader";

type PrintCardListProps = {
	cardData: ScryfallCard[];
};
export function PrintCardList({ cardData }: PrintCardListProps) {
	const cardIds = cardData.map((card: ScryfallCard) => card.id);
	const { data: cardQuantities, isLoading } = useGetCollectionCardQuantityById(cardIds);

	const mappedCardQuantities = useMemo(() => {
		return CollectionCardUtil.mapIdWithQuantities(cardQuantities);
	}, [cardQuantities]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<ul className={styles.resultsList} data-testid="printCardList">
				{cardData.map((card, index) => {
					const cardQuantities = mappedCardQuantities.get(card.id);
					return (
						<li
							id={Helpers.convertNameToHtmlId(card.name)}
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
