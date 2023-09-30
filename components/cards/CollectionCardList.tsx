import styles from "@/styles/results.module.scss";
import { CollectionCard } from "./CollectionCard";
import { CollectionCard as CollectionCardType } from "@/types/collection";

type CollectionCardListProps = {
	cardData: CollectionCardType[];
};
export function CollectionCardList({ cardData }: CollectionCardListProps) {
	return (
		<>
			<ul className={styles.resultsList}>
				{cardData.map((card, index) => {
					return (
						<li className={styles.cardWrapper} key={index}>
							<CollectionCard data={card} />
						</li>
					);
				})}
			</ul>
		</>
	);
}
