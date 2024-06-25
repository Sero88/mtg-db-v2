import { ScryfallSet } from "@/types/scryfall";
import styles from "@/styles/cardSets.module.scss";
import Image from "next/image";

export function DisplayScryfallSet({ scryfallSet }: { scryfallSet: ScryfallSet }) {
	return (
		<div className={styles.setDisplay}>
			<Image
				src={scryfallSet.icon_svg_uri}
				width={15}
				height={15}
				unoptimized={true}
				alt={scryfallSet.name}
				key={`${scryfallSet.name}-${scryfallSet.code}`}
			/>
			<p className={styles.setName}>{scryfallSet.name}</p>
		</div>
	);
}
