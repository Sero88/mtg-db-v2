import { Version } from "@/types/collection";
import { ScryfallCardPrices } from "@/types/scryfall";
import { UpdatePricesProps, UpdateState, UpdateStatus } from "@/types/updatePrices";
import {
	prepareCollection,
	retrieveCollectionHandler,
	retrieveScryfallDataHandler,
	updateCollection,
} from "@/utils/updatePricesUtil";
import React, { useEffect, useState, useRef } from "react";

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

	const updateStateHandler = (newUpdateState: UpdateState) => setUpdateState(newUpdateState);

	const steps = [
		{
			id: "retrieveCollection",
			name: "Retrieving collection data",
			callback: async () =>
				retrieveCollectionHandler(
					(versions) => (collectionVersions.current = versions),
					updateStateHandler,
					updateState
				),
		},
		{
			id: "retrieveScryfall",
			name: "Getting new card data",
			callback: async () =>
				retrieveScryfallDataHandler(
					(retrievedData) => (scryfallMappedData.current = retrievedData),
					updateStateHandler,
					updateState
				),
		},
		{
			id: "updateCollection",
			name: "Updating collection data with new prices",
			callback: () =>
				updateCollection(
					{
						collectionVersions: collectionVersions.current,
						scryfallMappedData: scryfallMappedData.current,
						failedToUpdateVersions: failedToUpdateVersions.current,
					},
					updateState,
					{
						updateFailedToUpdateHandler: (newArray) =>
							(failedToUpdateVersions.current = newArray),
						updateCallback: updateStateHandler,
					}
				),
		},
		{
			id: "prepareDownload",
			name: "Preparing data for download",
			callback: async () => prepareCollection(updateStateHandler, updateState),
		},
		{
			id: "completedCallback",
			name: "Complete",
			callback: async () => updateCompleteCallback(new Date()),
		},
	];

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
