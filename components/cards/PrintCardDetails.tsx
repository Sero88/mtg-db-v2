import styles from "@/styles/card.module.scss";
import { ScryfallCard } from "@/types/scryfall";
import { helpers } from "@/utils/helpers";

type CardDetailsProps = {
	data: ScryfallCard;
};
export function PrintCardDetails({ data }: CardDetailsProps) {
	const collectorsData = helpers.getCollectorsData(data);
	const promoType = collectorsData.type ? ` (${collectorsData.type})` : "";

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
					{`Reg: $${data?.prices?.usd} `}
					{data?.prices?.usd_foil && `/ Foil: $${data?.prices?.usd_foil}`}
				</span>
			</p>
		</div>
	);
}
