import styles from "@/styles/card.module.scss";
import { ScryfallCard } from "@/types/scryfall";
import { ScryfallHelper } from "@/utils/scryfallHelper";

type CardDetailsProps = {
	data: ScryfallCard;
};
export function PrintCardDetails({ data }: CardDetailsProps) {
	const collectorsData = ScryfallHelper.getCollectorsData(data);
	const promoType = collectorsData.type ? ` (${collectorsData.type})` : "";

	const showRegularPrice = data?.prices?.usd !== null;
	const showFoilPrice = data?.prices?.usd_foil !== null;
	const showDivider = showRegularPrice && showFoilPrice;
	return (
		<div className={styles.cardDetails}>
			<p>
				<strong className={styles.cardName}>{data.name}</strong>
				<br />
				<span className={styles.collectorsData}>
					<span>{`${data.set.toUpperCase()} ${collectorsData.number}${promoType}`}</span>
					{` | `}
					<span>{data.set_name}</span>
				</span>
				<br />
				<span className={styles.collectorsData}>
					{showRegularPrice && `Reg: $${data?.prices?.usd}`}
					{showDivider && `, `}
					{showFoilPrice && data?.prices?.usd_foil && `Foil: $${data?.prices?.usd_foil}`}
				</span>
			</p>
		</div>
	);
}
