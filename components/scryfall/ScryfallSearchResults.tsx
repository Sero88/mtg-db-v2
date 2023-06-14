import { ScryfallResultsList, ScryfallResultsTypeEnum } from "@/types/scryfall";
import { GeneralCardList } from "../cards/GeneralCardList";

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
		<div>
			<div>
				{
					cardData.type === ScryfallResultsTypeEnum.GENERAL ? (
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
					) : null //printCardList search results goes here
				}
			</div>
		</div>
	);
};
