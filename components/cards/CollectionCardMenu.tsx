import Image from "next/image";
import styles from "@/styles/collectionMenu.module.scss";
import { ScryfallCard } from "@/types/scryfall";
import { CollectionCardQuantity, CollectionCardQuantityTypeEnum } from "@/types/collection";
import { ScryfallUtil } from "@/utils/scryfallUtil";
import { useUpdateCollectionCardQuantity } from "@/hooks/useUpdateCollectionCardQuantity";
import { Loader } from "../utils/Loader";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

type CollectionCardMenuProp = {
	cardData: ScryfallCard;
	quantity: CollectionCardQuantity;
};
export function CollectionCardMenu({ quantity, cardData }: CollectionCardMenuProp) {
	const [updatedField, setUpdatedField] = useState("");
	const regularFieldName = "collection-quantity";
	const foilFieldName = "collection-foil-quantity";

	const updateCardQuantity = useUpdateCollectionCardQuantity();

	const regularQty = updateCardQuantity?.data?.quantity?.regular
		? updateCardQuantity?.data?.quantity?.regular
		: quantity?.regular ?? 0;

	const foilQty = updateCardQuantity?.data?.quantity?.foil
		? updateCardQuantity?.data?.quantity?.foil
		: quantity?.foil ?? 0;

	const selectText = (e: React.MouseEvent<Element, MouseEvent>) => {
		const element = e.target as HTMLInputElement;
		element.select();
	};

	const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = e.target.value == "" ? 0 : parseInt(e.target.value);
		const fieldName = e.target.name;

		if (fieldName == regularFieldName) {
			updateCardQuantity.mutate({
				card: cardData,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: newQuantity,
					[CollectionCardQuantityTypeEnum.FOIL]: foilQty,
				},
				type: CollectionCardQuantityTypeEnum.REGULAR,
			});
		} else if (fieldName == foilFieldName) {
			updateCardQuantity.mutate({
				card: cardData,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: regularQty,
					[CollectionCardQuantityTypeEnum.FOIL]: newQuantity,
				},
				type: CollectionCardQuantityTypeEnum.FOIL,
			});
		}

		setUpdatedField(fieldName);
	};

	if (updateCardQuantity.isLoading) {
		return (
			<ul className={styles.collectionMenu}>
				<Loader />
			</ul>
		);
	}

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

			{ScryfallUtil.hasRegularVersion(cardData) && (
				<li className={styles.collectionQuantity}>
					<input
						className={
							updatedField == regularFieldName && updateCardQuantity.isError
								? styles.inputError
								: ""
						}
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

			{ScryfallUtil.hasFoilVersion(cardData) && (
				<li className={styles.collectionQuantityFoil}>
					<input
						className={
							updatedField == foilFieldName && updateCardQuantity.isError
								? styles.inputError
								: ""
						}
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

			{updateCardQuantity.isError && (
				<div className={styles.updateError} data-testid="updateError">
					<FontAwesomeIcon icon={faCircleExclamation} />
					<p>Error Updating</p>
				</div>
			)}

			{updateCardQuantity.isSuccess && (
				<div className={styles.updateSuccess} data-testid="updateSuccess">
					<FontAwesomeIcon icon={faCheckCircle} />
					<p>Updated</p>
				</div>
			)}
		</ul>
	);
}
