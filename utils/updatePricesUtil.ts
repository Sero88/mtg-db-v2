import { Version } from "@/types/collection";
import { ScryfallCard, ScryfallCardPrices } from "@/types/scryfall";
import {
	CollectionDataUpdateHandlers,
	CollectionUpdateData,
	UpdateState,
} from "@/types/updatePrices";
import axios from "axios";

export async function retrieveCollectionHandler(
	updateVersions: (versions: Version[]) => void,
	updateCallback: (newUpdateState: UpdateState) => void,
	updateState: UpdateState
) {
	try {
		const response = await axios.get("/api/collection/versions");

		updateVersions(response?.data?.data as Version[]);

		updateCallback({
			...updateState,
			step: updateState.step + 1,
			updatedCards: {
				...updateState.updatedCards,
				total: response?.data?.data?.length as number,
			},
		});
	} catch (e) {
		throw new Error("Unable to retrieve cards from collection. Please try again later.");
	}
}

export async function retrieveScryfallDataHandler(
	updateScryfall: (scryfallData: Map<String, ScryfallCardPrices>) => void,
	updateCallback: (newUpdateState: UpdateState) => void,
	updateState: UpdateState
) {
	try {
		const bulkResponse = await axios.get(
			"https://api.scryfall.com/bulk-data/default-cards/?format=json"
		);

		const scryfallResponse = await axios.get(bulkResponse?.data?.download_uri);
		const scryfallCards = scryfallResponse?.data as ScryfallCard[];

		// for testing w/o calling api
		// const scryfallCards = [
		// 	{
		// 		id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
		// 		prices: {
		// 			eur: "0.45",
		// 			eur_foil: "2.29",
		// 			tix: "0.02",
		// 			usd: "0.32",
		// 			usd_etched: null,
		// 			usd_foil: "115.25",
		// 		},
		// 	},
		// ];

		const mappedCards = new Map();
		for (let i = 0; i < scryfallCards?.length; i++) {
			mappedCards.set(scryfallCards[i].id, scryfallCards[i].prices);
		}

		updateScryfall(mappedCards);
		updateCallback({
			...updateState,
			step: updateState.step + 1,
		});
	} catch (e) {
		throw new Error("Unable to retrieve price data.");
	}
}

export async function updateCollection(
	collectionData: CollectionUpdateData,
	updateState: UpdateState,
	updateHandlers: CollectionDataUpdateHandlers
) {
	collectionData.failedToUpdateVersions;
	const currentVersion = collectionData.collectionVersions[updateState.updatedCards.current];
	const prices = collectionData.scryfallMappedData.get(currentVersion?.scryfallId);
	const nextUpdateCurrent = updateState.updatedCards.current + 1;
	const updateIsComplete = nextUpdateCurrent >= updateState.updatedCards.total;
	const updateStep = updateIsComplete ? updateState.step + 1 : updateState.step;

	try {
		if (!prices) {
			throw new Error("No price data found for card");
		}

		await axios.patch("/api/collection/update", {
			scryfallId: currentVersion?.scryfallId,
			prices,
		});
	} catch (e) {
		updateHandlers.updateFailedToUpdateHandler([
			...collectionData.failedToUpdateVersions,
			currentVersion,
		]);
	}

	updateHandlers.updateCallback({
		...updateState,
		step: updateStep,
		updatedCards: {
			...updateState.updatedCards,
			current: !updateIsComplete ? nextUpdateCurrent : updateState.updatedCards.current,
		},
	});
}
