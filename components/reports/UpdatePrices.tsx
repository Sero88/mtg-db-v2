import { CollectionCard, Version } from "@/types/collection";
import { UpdatePricesProps, UpdateState, UpdateStatus } from "@/types/updatePrices";
import { fetchCollection } from "@/utils/dataFetch/clientSide/collection";
import React, { useEffect, useState, useRef, ReactElement } from "react";

export function UpdatePrices({ updateCompleteCallback }: UpdatePricesProps) {
	const collectionData = useRef<CollectionCard[]>();

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
		// {
		// 	id: "retrieveScryfall",
		// 	name: "Getting new card data",
		// 	completed: false,
		// 	callback: async () => retrieveScryfall(),
		// },
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
		const collection = await fetchCollection("/api/collection/");
		const versionCount = await fetchCollection("/api/collection/versions?action=count");

		if (!collection.success || !versionCount.success) {
			throw new Error("Unable to retrieve cards from collection. Please try again later.");
		}

		collectionData.current = collection?.data as CollectionCard[];
		setUpdateState((prevState) => ({
			...prevState,
			updatedCards: { ...prevState.updatedCards, total: versionCount?.data as number },
		}));
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
