import { Version } from "@/types/collection";
import { ScryfallCard, ScryfallCardPrices } from "@/types/scryfall";
import { UpdatePricesProps, UpdateState, UpdateStatus } from "@/types/updatePrices";
import axios from "axios";
import React, { useEffect, useState, useRef, ReactElement } from "react";

export function UpdatePrices({ updateCompleteCallback }: UpdatePricesProps) {
	const collectionVersions = useRef<Version[]>([]);
	const scryfallMappedData = useRef<Map<String, ScryfallCardPrices>>(new Map());
	const failedToUpdateVersions = useRef<Version[]>([]);

	const [updateState, setUpdateState] = useState<UpdateState>({
		status: UpdateStatus.initial,
		step: 0,
		updatedCards: { total: 0, current: 0 },
		updateMessage: "",
	});

	const steps = [
		{
			id: "retrieveCollection",
			name: "Retrieving collection data",
			callback: async () => retrieveCollectionHandler(),
		},
		{
			id: "retrieveScryfall",
			name: "Getting new card data",
			callback: async () => retrieveScryfallDataHandler(),
		},
		{
			id: "updateCollection",
			name: "Updating collection data with new prices",
			callback: () => updateCollection(),
		},
		{
			id: "prepareDownload",
			name: "Preparing data for download",
			callback: () => prepareCollection(),
		},
		{
			id: "completedCallback",
			name: "Complete",
			callback: async () => updateCompleteCallback(new Date()),
		},
	];

	const retrieveCollectionHandler = async () => {
		try {
			const versions = await axios.get("/api/collection/versions");

			collectionVersions.current = versions?.data?.data as Version[];

			setUpdateState({
				...updateState,
				step: updateState.step + 1,
				updatedCards: {
					...updateState.updatedCards,
					total: versions?.data?.data?.length as number,
				},
			});
		} catch (e) {
			throw new Error("Unable to retrieve cards from collection. Please try again later.");
		}
	};

	const retrieveScryfallDataHandler = async () => {
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

			scryfallMappedData.current = mappedCards;
			setUpdateState({
				...updateState,
				step: updateState.step + 1,
			});
		} catch (e) {
			throw new Error("Unable to retrieve price data.");
		}
	};

	const updateCollection = async () => {
		const currentVersion = collectionVersions.current[updateState.updatedCards.current];
		const prices = scryfallMappedData.current.get(currentVersion?.scryfallId);
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
			failedToUpdateVersions.current.push(currentVersion);
		}

		setUpdateState({
			...updateState,
			step: updateStep,
			updatedCards: {
				...updateState.updatedCards,
				current: !updateIsComplete ? nextUpdateCurrent : updateState.updatedCards.current,
			},
		});
	};

	const prepareCollection = async () => {
		try {
			const response = await axios.get("/api/collection");
			const collectionCards = response?.data?.data;

			var element = document.createElement("a");
			element.setAttribute(
				"href",
				"data:application/json;charset=utf-8," +
					encodeURIComponent(JSON.stringify(collectionCards))
			);
			element.setAttribute("download", "collection");

			element.style.display = "none";
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		} catch (e) {
			throw new Error("Unable to download collection.");
		}

		setUpdateState({
			...updateState,
			step: updateState.step + 1,
		});
	};

	useEffect(() => {
		const inProgress =
			updateState.status == UpdateStatus.inProgress && updateState.step < steps.length;
		const isComplete =
			updateState.status == UpdateStatus.inProgress && updateState.step === steps.length;

		if (inProgress) {
			steps[updateState.step].callback().catch((e) => {
				setUpdateState((prevState) => ({
					...prevState,
					status: UpdateStatus.error,
					updateMessage: `Error: ${e.message}`,
				}));
			});
		} else if (isComplete) {
			setUpdateState((prevState) => ({
				...prevState,
				step: 0,
				status: UpdateStatus.completed,
				updateMessage: `Success: collection has been updated.`,
			}));
		}
	}, [updateState.status, updateState.step, updateState.updatedCards.current]);

	//todo remove after testing 👇
	console.log("state", updateState);
	console.log("collection", collectionVersions.current);
	console.log("scryfall data", scryfallMappedData);
	console.log("failed to update", failedToUpdateVersions);
	//todo remove after testing 👆

	const updateCount =
		steps[updateState.step]?.id == "updateCollection" ? (
			<>
				<ul>
					<li>{`Card ${updateState.updatedCards.current} of ${updateState.updatedCards.total}`}</li>
				</ul>
				{updateState.updatedCards.current > 0 &&
					(
						(updateState.updatedCards.current / updateState.updatedCards.total) *
						100
					).toFixed(2) + "%"}
			</>
		) : null;

	return (
		<>
			<p>{UpdateStatus[updateState.status]}</p>
			<p>{updateState.updateMessage}</p>
			{updateCount}

			<button
				onClick={() => setUpdateState({ ...updateState, status: UpdateStatus.inProgress })}
			>
				Update Prices
			</button>
		</>
	);
}
