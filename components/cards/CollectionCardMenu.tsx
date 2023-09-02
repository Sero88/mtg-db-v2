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
export function CollectionCardMenu({
	quantity: initialQuantities,
	cardData,
}: CollectionCardMenuProp) {
	const [updatedField, setUpdatedField] = useState("");
	const [quantities, setQuantities] = useState({
		[CollectionCardQuantityTypeEnum.REGULAR]:
			initialQuantities?.[CollectionCardQuantityTypeEnum.REGULAR] ?? 0,
		[CollectionCardQuantityTypeEnum.FOIL]:
			initialQuantities?.[CollectionCardQuantityTypeEnum.FOIL] ?? 0,
	});

	const regularFieldName = "collection-quantity";
	const foilFieldName = "collection-foil-quantity";
	const updateCardQuantity = useUpdateCollectionCardQuantity();

	const selectText = (e: React.MouseEvent<Element, MouseEvent>) => {
		const element = e.target as HTMLInputElement;
		element.select();
	};

	const updateQuantity = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = e.target.value == "" ? 0 : parseInt(e.target.value);
		const fieldName = e.target.name;
		let updateResults;

		if (fieldName == regularFieldName) {
			updateResults = await updateCardQuantity.mutateAsync({
				card: cardData,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: newQuantity,
					[CollectionCardQuantityTypeEnum.FOIL]:
						quantities[CollectionCardQuantityTypeEnum.FOIL],
				},
				type: CollectionCardQuantityTypeEnum.REGULAR,
			});
		} else if (fieldName == foilFieldName) {
			updateResults = await updateCardQuantity.mutateAsync({
				card: cardData,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]:
						quantities[CollectionCardQuantityTypeEnum.REGULAR],
					[CollectionCardQuantityTypeEnum.FOIL]: newQuantity,
				},
				type: CollectionCardQuantityTypeEnum.FOIL,
			});
		}

		if (updateResults?.quantity) {
			setQuantities({ ...updateResults.quantity });
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
						value={quantities[CollectionCardQuantityTypeEnum.REGULAR] ?? 0}
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
						value={quantities[CollectionCardQuantityTypeEnum.FOIL] ?? 0}
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
