import { CollectionCard, Version } from "@/types/collection";
import styles from "@/styles/collectionCardModal.module.scss";
import { Helpers } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CollectionCardImages } from "./CollectionCardImages";
import { CollectionCardVersionsList } from "./CollectionCardVersionsList";
import { useState } from "react";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";

type CardModalProps = {
	card: CollectionCard;
	showModal: boolean;
	closeModalCallback: () => void;
};

export function CollectionCardModal({ showModal, closeModalCallback, card }: CardModalProps) {
	const [selectedVersion, setSelectedVersion] = useState<Version>(
		CollectionCardUtil.getDefaultSearchVersion(card)
	);

	const selectionHandler = (newSelectedVersion: Version) => {
		setSelectedVersion(newSelectedVersion);
	};

	const clickHandlerCloseModal = (event: React.MouseEvent<Element, MouseEvent>) => {
		let target =
			event.target == event.currentTarget ||
			(event.target !== event.currentTarget &&
				!event.currentTarget.matches('div[class*="Container"]'))
				? event.currentTarget
				: false;

		const canCloseModal = target ? Helpers.getDataset(target as HTMLElement, "close") : false;

		if (!canCloseModal) {
			return;
		}

		closeModalCallback();
	};

	if (!showModal) {
		return null;
	}

	return (
		<div
			className={styles.cardModalContainer}
			onClick={clickHandlerCloseModal}
			data-close={true}
			data-testid="modalContainer"
		>
			<div className={styles.cardModalWrapper}>
				<header>
					<h1>{card?.name}</h1>
					<div
						className={styles.closeModal}
						onClick={clickHandlerCloseModal}
						data-close={true}
						data-testid="closeIcon"
					>
						<FontAwesomeIcon icon={faClose} />
					</div>
				</header>

				<div className={styles.cardModalMain}>
					<CollectionCardImages cardName={card.name} version={selectedVersion} />
					<CollectionCardVersionsList
						versions={card.versions!}
						selectionHandler={selectionHandler}
						selectedVersion={selectedVersion}
					/>
				</div>
			</div>
		</div>
	);
}
