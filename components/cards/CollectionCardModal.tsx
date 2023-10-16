import { CollectionCard } from "@/types/collection";
import styles from "@/styles/collectionCardModal.module.scss";
import { Helpers } from "@/utils/helpers";

type CardModalProps = {
	card: CollectionCard | undefined;
	showModal: boolean;
	closeModalCallback: () => void;
};

export function CollectionCardModal({ showModal, closeModalCallback, card }: CardModalProps) {
	const images = <p>images placeholder</p>;

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
						icon goes here
					</div>
				</header>

				<div className={styles.cardModalMain}>
					<div className={styles.cardImages}>{images}</div>
					<p>Rows go here</p>
				</div>
			</div>
		</div>
	);
}
