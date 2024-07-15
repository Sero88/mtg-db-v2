import { CollectionCard, Version } from "./collection";

export type failedUpdate = {
	card: CollectionCard;
	version: Version;
};

export enum UpdateStatus {
	initial,
	inProgress,
	error,
	completed,
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
