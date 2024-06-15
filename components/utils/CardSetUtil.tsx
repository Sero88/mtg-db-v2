import { ScryfallSet } from "@/types/scryfall";
import { SelectorListItem } from "@/types/searchSelector";
import { SetUtil } from "@/utils/setUtil";
import Image from "next/image";
import styles from "@/styles/cardSets.module.scss";

export function createSetsArray(scryfallSets: ScryfallSet[], collectionSets: string[]) {
	const searchSetSelectorList = [] as SelectorListItem[];
	for (const scryfallSet of scryfallSets) {
		if (searchSetSelectorList.length == collectionSets.length) {
			break;
		}

		if (!SetUtil.isAllowedSet(scryfallSet)) {
			continue;
		}

		collectionSets.forEach((set: string) => {
			const displaySet = (
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
			// scryfall broke the 3 letter mtg set convetion, so some sets on scryfall have more than 3 letters such as hrt20
			// parent_set_code is set for scryfall sets such as promo and tokens, the parent is the set we want, so ignore the child
			// lastly, if none of the above worked, convert the set into three letters and check againts it
			if (
				scryfallSet.code == set ||
				(!scryfallSet.parent_set_code && SetUtil.getCardSet(scryfallSet.code) == set)
			) {
				searchSetSelectorList.push({
					display: displaySet,
					value: set,
					searchValue: scryfallSet.name,
				});
			}
		});
	}
	return searchSetSelectorList;
}
