import { ScryfallSymbol } from "@/types/scryfall";
import styles from "@/styles/addSymbols.module.scss";
import Image from "next/image";

type CardListItemSpec = {
	symbol: ScryfallSymbol;
};
export function CardTextListItem({ symbol }: CardListItemSpec) {
	return (
		<div className={styles.cardListItem}>
			{symbol.svg_uri && (
				<div className={styles.symbolImage}>
					<Image
						src={symbol.svg_uri}
						width={15}
						height={15}
						unoptimized={true}
						alt={symbol.english}
					/>
				</div>
			)}
			<span>&nbsp;{symbol.english}</span>
		</div>
	);
}
