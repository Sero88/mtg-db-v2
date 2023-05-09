import { QueryResult } from "./QueryResult";
import { QueryResultData } from "@/types/queryResult";
import { render, screen } from "@testing-library/react";

const queryResultData: QueryResultData = {
	isLoading: false,
	error: false,
	data: {},
};

describe("QueryResult", () => {
	it("should display loader", () => {
		const updatedQueryResultData = { ...queryResultData, isLoading: true };
		render(
			<QueryResult queryResult={updatedQueryResultData}>
				<p>Test</p>
			</QueryResult>
		);

		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should display error message", () => {
		const updatedQueryResultData = { ...queryResultData, error: true };
		const errorMessage = "Test Error";
		render(
			<QueryResult queryResult={updatedQueryResultData} errorMessage={errorMessage}>
				<p>Test</p>
			</QueryResult>
		);
		expect(screen.queryByText(`Error: ${errorMessage}`)).not.toBeNull();
	});

	it("should display children", () => {
		const errorMessage = "Test Error";
		render(
			<QueryResult queryResult={queryResultData} errorMessage={errorMessage}>
				<p>Test</p>
			</QueryResult>
		);
		expect(screen.queryByText("Test")).not.toBeNull();
	});
});
