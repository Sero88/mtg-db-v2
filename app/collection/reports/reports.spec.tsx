import ReportsPage from "./page";
import { screen, render, queryByTestId } from "@testing-library/react";
import * as UpdatePricesComponent from "@/components/reports/UpdatePrices";
import { useGetCollectionVersions } from "@/hooks/useGetCollectionVersions";
import { UseQueryResult } from "react-query";
import * as QueryResultComponent from "@/components/utils/QueryResult";

jest.mock("@/components/reports/UpdatePrices", () => {
	const originalModule = jest.requireActual("@/components/reports/UpdatePrices");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/utils/QueryResult", () => {
	const originalModule = jest.requireActual("@/components/utils/QueryResult");
	return {
		__esModule: true,
		...originalModule,
	};
});

const updatePricesSpy = jest.spyOn(UpdatePricesComponent, "UpdatePrices");
updatePricesSpy.mockImplementation(() => <></>);
const queryResultSpy = jest.spyOn(QueryResultComponent, "QueryResult");

jest.mock("@/hooks/useGetCollectionVersions");
const useGetCollectionVersionsMock = jest.mocked(useGetCollectionVersions);

describe("/collection/search page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useGetCollectionVersionsMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);
	});

	it("should display reports section on load", () => {
		render(<ReportsPage />);
		expect(screen.queryByTestId("reports-section")).not.toBeNull();
	});
	it("should display header", () => {
		render(<ReportsPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should display quantity section", () => {
		render(<ReportsPage />);
		expect(screen.queryByText("Quantity Data:")).not.toBeNull();
	});

	it("should display price section", () => {
		render(<ReportsPage />);
		expect(screen.queryByText("Price Data:")).not.toBeNull();
	});

	it("should display UpdatePrices section", () => {
		render(<ReportsPage />);
		expect(updatePricesSpy).toHaveBeenCalled();
	});

	it("should show loader when fetching version data", () => {
		useGetCollectionVersionsMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);

		render(<ReportsPage />);
		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should use QueryResult", () => {
		render(<ReportsPage />);
		expect(queryResultSpy).toHaveBeenCalled();
	});

	it("should not display reports section when loading versions", () => {
		useGetCollectionVersionsMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);
		render(<ReportsPage />);
		expect(screen.queryByTestId("reports-section")).toBeNull();
		expect(screen.queryByTestId("loader")).not.toBeNull();
	});
});
