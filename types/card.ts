import { ScryfallResultsTypeEnum } from "@/types/scryfall";

//deals with app-level Card possible types
export enum CardType {
	COLLECTION = "Collection",
	SCRYFALL_PRINT = ScryfallResultsTypeEnum.PRINT,
	SCRYFALL_GENERAL = ScryfallResultsTypeEnum.GENERAL,
}
