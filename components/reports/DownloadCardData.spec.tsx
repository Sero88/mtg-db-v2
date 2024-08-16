import * as QueryResultComponent from "@/components/utils/QueryResult";
import { DownloadCardData } from "./DownloadCardData";
import { fireEvent, render, screen } from "@testing-library/react";
import { useGetCollectionWithVersions } from "@/hooks/useGetCollectionWithVersions";
import { UseQueryResult } from "react-query";

jest.mock("@/components/utils/QueryResult", () => {
	const originalModule = jest.requireActual("@/components/utils/QueryResult");
	return {
		__esModule: true,
		...originalModule,
	};
});

const queryResultSpy = jest.spyOn(QueryResultComponent, "QueryResult");

jest.mock("@/hooks/useGetCollectionWithVersions");
const useGetCollectionWithVersionsMock = jest.mocked(useGetCollectionWithVersions);

const createElementSpy = jest.spyOn(global.document, "createElement");
const removeElementSpy = jest.spyOn(global.document.body, "removeChild");

describe("DownloadCardData", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useGetCollectionWithVersionsMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);
	});
	it("should use QueryResult", () => {
		render(<DownloadCardData />);
		expect(queryResultSpy).toHaveBeenCalled();
	});

	it("should show loader while data is being fetched", () => {
		useGetCollectionWithVersionsMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);
		render(<DownloadCardData />);
		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should create a new anchor for download when button is clicked", () => {
		useGetCollectionWithVersionsMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: { test: "test" },
			isSuccess: true,
		} as unknown as UseQueryResult);
		render(<DownloadCardData />);

		const button = screen.getByRole("button", { name: "Download Card Data" });
		fireEvent.click(button);
		expect(createElementSpy).toHaveBeenCalledWith("a");
		const aTag = removeElementSpy.mock.calls[0][0] as HTMLAnchorElement;

		expect(removeElementSpy).toHaveBeenCalledWith(aTag);
		expect(aTag.href).toEqual(
			"data:application/json;charset=utf-8,%7B%22test%22%3A%22test%22%7D"
		);
		expect(aTag.download).toEqual("collection");
		expect(aTag.style.display).toEqual("none");
	});
});
