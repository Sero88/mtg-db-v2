import { Loader } from "@/components/utils/Loader";
import { QueryResultData } from "@/types/queryResult";
import { ReactElement } from "react";
import styles from "@/styles/queryResults.module.scss";

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
		return (
			<div className={styles.loaderWrapper}>
				<Loader />
			</div>
		);
	}

	if (queryResult.error) {
		return <p>Error: {errorMessage}</p>;
	}

	if (queryResult.data) {
		return children;
	}

	return null;
}
