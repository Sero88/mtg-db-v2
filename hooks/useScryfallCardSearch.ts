import { useQuery } from "react-query";
import { makeGeneralSearch, makePrintSearch } from "@/utils/dataFetch/scryfallCardSearch";
import { ScryfallResultsTypeEnum, ScryfallSearchCardData } from "@/types/scryfall";

type useCardSearchProps = {
	searchCardData: ScryfallSearchCardData;
	page: number;
};

export function useScryfallCardSearch({ searchCardData, page }: useCardSearchProps) {
	return useQuery(
		["cardSearch", searchCardData.cardName, searchCardData.setCode, page],
		async () => {
			if (!searchCardData.cardName && !searchCardData.setCode) {
				return undefined;
			}

			const initialSearchResults = !searchCardData.isPrintSearch
				? await makeGeneralSearch(searchCardData, page)
				: await makePrintSearch({
						cardName: searchCardData.cardName,
						setCode: searchCardData.setCode,
				  });

			let secondSearchPrintResults = undefined;
			if (initialSearchResults?.data?.length == 1 && !searchCardData.isPrintSearch) {
				secondSearchPrintResults = await makePrintSearch({
					cardName: initialSearchResults?.data[0]?.name,
					setCode: searchCardData.setCode,
					isPrintSearch: true,
				});
			}

			return {
				resultsList: secondSearchPrintResults ?? initialSearchResults,
				type:
					searchCardData.isPrintSearch || secondSearchPrintResults
						? ScryfallResultsTypeEnum.PRINT
						: ScryfallResultsTypeEnum.GENERAL,
			};
		}
	);
}
