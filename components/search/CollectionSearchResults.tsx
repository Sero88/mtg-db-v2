import { CollectionCard } from "@/types/collection";
import { CollectionCardList } from "../cards/CollectionCardList";

type SearchResultsProps = {
	cardData: CollectionCard[] | undefined;
};
export function CollectionSearchResults({ cardData }: SearchResultsProps) {
	if (!cardData?.length) {
		return <p data-testid="no-search-match">No cards matched your search.</p>;
	}
	const cardText = cardData.length > 1 ? "cards" : "card";
	return (
		<>
			<h2>Search Results</h2>
			<p data-testid="search-matched">
				{cardData.length} {cardText} matched your search.
			</p>
			<CollectionCardList cardData={cardData} />
		</>
	);
}
