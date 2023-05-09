import { Loader } from "@/components/utils/Loader";
import { QueryResultData } from "@/types/queryResult";
import { ReactElement } from "react";

export type QueryResultProps = {
	queryResult: QueryResultData;
	errorMessage?: string;
	children: ReactElement;
};

export function QueryResult({
	queryResult,
	children,
	errorMessage = "Something went wrong. Please try again",
}: QueryResultProps) {
	if (queryResult.isLoading) {
		return <Loader />;
	}

	if (queryResult.error) {
		return <p>Error: {errorMessage}</p>;
	}

	if (queryResult.data) {
		return children;
	}

	return null;
}
