import { ScryfallResultsList, ScryfallResultsTypeEnum } from "@/types/scryfall";
import { GeneralCardList } from "../cards/GeneralCardList";
import { PrintCardList } from "../cards/PrintCardList";
import styles from "@/styles/results.module.scss";

type SearchResultsProps = {
	cardData:
		| {
				resultsList: ScryfallResultsList;
				type: ScryfallResultsTypeEnum;
		  }
		| undefined;
	clickHandler: Function;
};

export const ScryfallSearchResults = ({ cardData, clickHandler }: SearchResultsProps) => {
	if (!cardData?.resultsList?.total_cards) {
		return <p data-testid="no-search-match">No cards matched your search.</p>;
	}

	return (
		<div className={styles.searchResults}>
			{cardData.type === ScryfallResultsTypeEnum.GENERAL ? (
				<>
					<h2>Search Results</h2>
					<p data-testid="search-matched">
						{cardData.resultsList.total_cards} cards matched your search.
					</p>
					<GeneralCardList
						cardData={cardData?.resultsList?.data}
						clickHandler={clickHandler}
					/>
				</>
			) : (
				<>
					<h2>{cardData?.resultsList.data[0].name}:</h2>
					<PrintCardList cardData={cardData?.resultsList?.data} />
				</>
			)}
		</div>
	);
};
