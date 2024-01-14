import { ReactNode } from "react";

export type SelectorListItem = {
	display: string | ReactNode;
	value: string;
	searchValue?: string;
};
