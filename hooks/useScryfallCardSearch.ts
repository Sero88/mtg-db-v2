import { useQuery } from "react-query";
import { makeGeneralSearch, makePrintSearch } from "@/utils/dataFetch/scryfallCardSearch";
import { ScryfallResultsTypeEnum, ScryfallSearchCardData } from "@/types/scryfall";

type useCardSearchProps = {
	searchCardData: ScryfallSearchCardData;
	page: number;
};

export function useScryfallCardSearch({ searchCardData, page }: useCardSearchProps) {
	return useQuery(["cardSearch", searchCardData.cardName, searchCardData.setCode], async () => {
		if (!searchCardData.cardName && !searchCardData.setCode) {
			return undefined;
		}

		let printResults = undefined;
		const generalResults = await makeGeneralSearch(searchCardData, page);

		if (generalResults?.data?.length == 1) {
			printResults = await makePrintSearch({
				cardName: generalResults?.data[0]?.name,
				setCode: searchCardData.setCode,
			});
		}

		return {
			data: printResults ?? generalResults,
			type: printResults ? ScryfallResultsTypeEnum.PRINT : ScryfallResultsTypeEnum.GENERAL,
		};
	});
}
