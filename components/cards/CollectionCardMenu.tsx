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
	quantity: {
		[CollectionCardQuantityTypeEnum.REGULAR]?: number | string | undefined;
		[CollectionCardQuantityTypeEnum.FOIL]?: number | string | undefined;
	};
};

export function CollectionCardMenu({
	quantity: initialQuantities,
	cardData,
}: CollectionCardMenuProp) {
	const regularField = CollectionCardQuantityTypeEnum.REGULAR;
	const foilField = CollectionCardQuantityTypeEnum.FOIL;
	const [updatedField, setUpdatedField] = useState("");
	const [quantities, setQuantities] = useState(initialQuantities);

	const updateCardQuantity = useUpdateCollectionCardQuantity();

	const selectText = (e: React.MouseEvent<Element, MouseEvent>) => {
		const element = e.target as HTMLInputElement;
		element.select();
	};

	const updateQuantity = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value);
		const fieldName = e.target.name as CollectionCardQuantityTypeEnum;
		let updateResults;

		if (isNaN(newQuantity)) {
			fieldName == regularField
				? setQuantities({ ...quantities, [regularField]: "" })
				: setQuantities({ ...quantities, [foilField]: "" });
			return;
		}

		updateResults = await updateCardQuantity.mutateAsync({
			card: cardData,
			type: fieldName,
			newQuantity,
		});

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
							updatedField == regularField && updateCardQuantity.isError
								? styles.inputError
								: ""
						}
						name={regularField}
						value={quantities?.[regularField] ?? 0}
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
							updatedField == foilField && updateCardQuantity.isError
								? styles.inputError
								: ""
						}
						name={foilField}
						value={quantities?.[foilField] ?? 0}
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
