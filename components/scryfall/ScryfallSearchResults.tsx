import { ScryfallResultsList, ScryfallResultsTypeEnum } from "@/types/scryfall";
import { GeneralCardList } from "../cards/GeneralCardList";

type SearchResultsProps = {
	cardData:
		| {
				data: ScryfallResultsList;
				type: ScryfallResultsTypeEnum;
		  }
		| undefined;
	clickHandler: Function;
};

export const ScryfallSearchResults = ({ cardData, clickHandler }: SearchResultsProps) => {
	if (!cardData?.data?.total_cards) {
		return <p data-testid="no-search-match">No cards matched your search.</p>;
	}

	return (
		<div>
			<h2>Search Results</h2>
			<div>
				{
					cardData.type === ScryfallResultsTypeEnum.GENERAL ? (
						<>
							<p data-testid="search-matched">
								{cardData.data.data.length} cards matched your search.
							</p>
							<GeneralCardList
								cardData={cardData?.data?.data}
								clickHandler={clickHandler}
							/>
						</>
					) : null //printCardList search results goes here
				}
			</div>
		</div>
	);
};
