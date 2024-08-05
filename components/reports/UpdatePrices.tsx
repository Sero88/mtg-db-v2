import { Version } from "@/types/collection";
import { ScryfallCardPrices } from "@/types/scryfall";
import { UpdatePricesProps, UpdateState, UpdateStatus, UpdateStep } from "@/types/updatePrices";
import {
	prepareCollection,
	retrieveCollectionHandler,
	retrieveScryfallDataHandler,
	updateCollection,
} from "@/utils/updatePricesUtil";
import React, { useEffect, useState, useRef } from "react";
import { StepStatusDisplay } from "./StepStatusDisplay";
import { FailedToUpdateCards } from "./FailedToUpdateCards";

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

	const hasInitialStatus = updateState.status == UpdateStatus.initial;
	const updateStateHandler = (newUpdateState: UpdateState) => setUpdateState(newUpdateState);
	const showFailedUpdates =
		failedToUpdateVersions.current.length > 0 && updateState.status == UpdateStatus.complete;

	const steps: UpdateStep[] = [
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
			name: "Getting new price data",
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
			callback: async () =>
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
			callback: async () => {
				setUpdateState({ ...updateState, status: UpdateStatus.complete });
				updateCompleteCallback(new Date());
			},
		},
	];

	useEffect(() => {
		const inProgress =
			updateState.status == UpdateStatus.inProgress && updateState.step < steps.length;

		if (inProgress) {
			steps[updateState.step].callback().catch((e) => {
				setUpdateState((prevState) => ({
					...prevState,
					status: UpdateStatus.error,
					updateMessage: `Error: ${e.message}`,
				}));
			});
		}
	}, [updateState.status, updateState.step, updateState.updatedCards.current]);

	//todo remove after testing 👇
	console.log("state", updateState);
	console.log("collection", collectionVersions.current);
	console.log("scryfall data", scryfallMappedData);
	console.log("failed to update", failedToUpdateVersions);
	//todo remove after testing 👆

	return (
		<>
			{!hasInitialStatus && (
				<StepStatusDisplay
					currentStep={updateState.step}
					steps={steps}
					updatedCards={updateState.updatedCards}
				/>
			)}
			<p>{updateState.updateMessage}</p>

			{showFailedUpdates && (
				<FailedToUpdateCards failedToUpdateVersions={failedToUpdateVersions.current} />
			)}

			<button
				disabled={!hasInitialStatus}
				onClick={() => setUpdateState({ ...updateState, status: UpdateStatus.inProgress })}
			>
				Update Prices
			</button>
		</>
	);
}
