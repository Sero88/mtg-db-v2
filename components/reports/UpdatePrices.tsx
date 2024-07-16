import { CollectionCard } from "@/types/collection";
import { ScryfallCard } from "@/types/scryfall";
import { UpdatePricesProps, UpdateState, UpdateStatus } from "@/types/updatePrices";
import axios from "axios";
import React, { useEffect, useState, useRef, ReactElement } from "react";

export function UpdatePrices({ updateCompleteCallback }: UpdatePricesProps) {
	const collectionData = useRef<CollectionCard[]>();
	const scryfallMappedData = useRef<Map<String, ScryfallCard[]>>();

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
			completed: false,
			callback: async () => retrieveScryfallDataHandler(),
		},
		// {
		// 	id: "updateCollection",
		// 	name: "Updating collection data with new prices",
		// 	completed: false,
		// 	callback: () => updateCollection(),
		// },
		// {
		// 	id: "prepareDownload",
		// 	name: "Preparing data for download",
		// 	completed: false,
		// 	callback: () => prepareCollection(),
		// },
		// {
		// 	id: "completedCallback",
		// 	name: "Complete",
		// 	completed: false,
		// 	callback: () => updateCompleteCallback( new Date()),
		// },
	];

	const retrieveCollectionHandler = async () => {
		try {
			const collection = await axios.get("/api/collection/");
			const versionCount = await axios.get("/api/collection/versions?action=count");

			collectionData.current = collection?.data?.data as CollectionCard[];
			setUpdateState((prevState) => ({
				...prevState,
				updatedCards: {
					...prevState.updatedCards,
					total: versionCount?.data?.data as number,
				},
			}));
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

			//for testing w/o calling api
			// const scryfallCards = [
			// 	{
			// 		id: "42ba0e13-d20f-47f9-9c86-2b0b13c39ada",
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
		} catch (e) {
			throw new Error("Unable to retrieve price data.");
		}
	};

	useEffect(() => {
		const newStep = updateState.step - 1; //starts at 0 in array
		const inProgress = updateState.status == UpdateStatus.inProgress && newStep < steps.length;
		const isComplete =
			updateState.status == UpdateStatus.inProgress && newStep === steps.length;

		if (inProgress) {
			steps[newStep]
				.callback()
				.then(() => {
					setUpdateState((prevState) => ({ ...prevState, step: updateState.step + 1 }));
				})
				.catch((e) => {
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
	}, [updateState.status, updateState.step]);

	//todo remove after testing 👇
	console.log("state", updateState);
	console.log("collection", collectionData.current);
	console.log("scryfall data", scryfallMappedData);
	//todo remove after testing 👆

	return (
		<>
			<p>{UpdateStatus[updateState.status]}</p>
			<p>{updateState.updateMessage}</p>
			<button
				onClick={() =>
					setUpdateState({ ...updateState, status: UpdateStatus.inProgress, step: 1 })
				}
			>
				Update Prices
			</button>
		</>
	);
}
