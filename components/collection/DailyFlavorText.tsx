import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/dailyFlavorText.module.scss";
import { getFlavorText } from "@/utils/dataFetch/flavorText";

export async function DailyFlavorText() {
	const flavorTextData = await getFlavorText();

	return (
		<div className={styles.dailyFlavorText}>
			<p>
				<FontAwesomeIcon icon={faQuoteLeft} />
				<span>{flavorTextData.flavorText}</span>
				<FontAwesomeIcon icon={faQuoteRight} />
			</p>
			<p className={styles.cardName}>{flavorTextData.cardName}</p>
		</div>
	);
}
