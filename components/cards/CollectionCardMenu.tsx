import Image from "next/image";
import styles from "@/styles/collectionMenu.module.scss";
import { ScryfallCard } from "@/types/scryfall";
import { CardQuantity, CollectionCardQuantityTypeEnum } from "@/types/collection";
import { ScryfallHelper } from "@/utils/scryfallHelper";

type CollectionCardMenuProp = {
	cardData: ScryfallCard;
	quantity: CardQuantity;
};
export function CollectionCardMenu({ quantity, cardData }: CollectionCardMenuProp) {
	const regularQty = quantity?.regular ?? 0;
	const foilQty = quantity?.foil ?? 0;
	const regularFieldName = "collection-quantity";
	const foilFieldName = "collection-foil-quantity";

	const selectText = (e: React.MouseEvent<Element, MouseEvent>) => {
		const element = e.target as HTMLInputElement;
		element.select();
	};

	const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = e.target.value == "" ? 0 : parseInt(e.target.value);

		// e.target.name == regularFieldName
		// 	? updateCollectionHandler(
		// 			cardData,
		// 			{
		// 				[CollectionCardQuantityTypeEnum.REGULAR]: newQuantity,
		// 				[CollectionCardQuantityTypeEnum.FOIL]: foilQty,
		// 			},
		// 			CollectionCardQuantityTypeEnum.REGULAR
		// 	  )
		// 	: updateCollectionHandler(
		// 			cardData,
		// 			{
		// 				[CollectionCardQuantityTypeEnum.REGULAR]: regularQty,
		// 				[CollectionCardQuantityTypeEnum.FOIL]: newQuantity,
		// 			},
		// 			CollectionCardQuantityTypeEnum.FOIL
		// 	  );
	};

	return (
		<ul className={styles.collectionMenu}>
			<li className={styles.collectionLogo}>
				<Image
					src="/images/favicon.png"
					width={25}
					height={25}
					alt="collection logo"
					unoptimized={true}
				/>
			</li>

			{ScryfallHelper.hasRegularVersion(cardData) && (
				<li className={styles.collectionQuantity}>
					<input
						name={regularFieldName}
						type="number"
						value={regularQty ?? 0}
						onClick={(e) => {
							selectText(e);
						}}
						onChange={updateQuantity}
						data-testid="regular-input"
						data-collection_menu_action="set"
					/>
				</li>
			)}

			{ScryfallHelper.hasFoilVersion(cardData) && (
				<li className={styles.collectionQuantityFoil}>
					<input
						name={foilFieldName}
						type="number"
						value={foilQty ?? 0}
						onClick={(e) => {
							selectText(e);
						}}
						onChange={updateQuantity}
						data-testid="foil-input"
						data-collection_menu_action="set"
					/>
				</li>
			)}
		</ul>
	);
}
