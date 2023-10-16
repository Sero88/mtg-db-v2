import { CollectionCard as CollectionCardType } from "@/types/collection";
import { CollectionCard } from "../cards/CollectionCard";
import { CardList } from "../cards/CardList";
import { CollectionCardModal } from "../cards/CollectionCardModal";
import { useState } from "react";
import { Helpers } from "@/utils/helpers";

type SearchResultsProps = {
	cardData: CollectionCardType[] | undefined;
};
export function CollectionSearchResults({ cardData }: SearchResultsProps) {
	const [showModal, setShowModal] = useState(false);
	const [selectedCard, setSelectedCard] = useState<CollectionCardType>();
	if (!cardData?.length) {
		return <p data-testid="no-search-match">No cards matched your search.</p>;
	}
	const cardClickHandler = (card: CollectionCardType) => {
		setSelectedCard(card);
		setShowModal(true);
	};

	const modalCloseClickHandler = () => {
		setShowModal(false);
	};

	const cardText = cardData.length > 1 ? "cards" : "card";
	return (
		<>
			<h2>Search Results</h2>
			<p data-testid="search-matched">
				{cardData.length} {cardText} matched your search.
			</p>
			<CardList
				cardData={cardData}
				renderCard={(card) => (
					<CollectionCard
						data={card as CollectionCardType}
						clickHandler={cardClickHandler}
					/>
				)}
			/>

			<CollectionCardModal
				card={selectedCard}
				showModal={showModal}
				closeModalCallback={modalCloseClickHandler}
			/>
		</>
	);
}
