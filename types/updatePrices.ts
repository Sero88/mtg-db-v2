import { CollectionCard, Version } from "./collection";
import { ScryfallCardPrices } from "./scryfall";

export type failedUpdate = {
	card: CollectionCard;
	version: Version;
};

export enum UpdateStatus {
	initial,
	inProgress,
	error,
	complete,
}

export type UpdateState = {
	status: UpdateStatus;
	step: number;
	updatedCards: {
		total: number;
		current: number;
	};
	updateMessage: string;
};

export type UpdatePricesProps = {
	updateCompleteCallback: (date: Date) => void;
};

export type CollectionUpdateData = {
	collectionVersions: Version[];
	scryfallMappedData: Map<String, ScryfallCardPrices>;
	failedToUpdateVersions: Version[];
};

export type CollectionDataUpdateHandlers = {
	updateFailedToUpdateHandler: (newArray: Version[]) => void;
	updateCallback: (newUpdateState: UpdateState) => void;
};

export type UpdateStep = {
	id: string;
	name: string;
	callback: () => Promise<void>;
};
