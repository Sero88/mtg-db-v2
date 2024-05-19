import SearchPage from "./page";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { UseQueryResult } from "react-query";
import * as CollectionSearchFormComponent from "@/components/search/CollectionSearchForm";

jest.mock("@/components/search/CollectionSearchForm", () => {
	const originalModule = jest.requireActual("@/components/search/CollectionSearchForm");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/hooks/useCollectionCardSearch");
const useCollectionCardSearchMock = jest.mocked(useCollectionCardSearch);

const collectionSearchFormSpy = jest.spyOn(CollectionSearchFormComponent, "CollectionSearchForm");

describe("/collection/search page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useCollectionCardSearchMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);
	});

	it("should display header", () => {
		render(<SearchPage />);
		expect(screen.queryByRole("heading", { level: 1 })).not.toBeNull();
	});

	it("should update field value", async () => {
		const expectedUpdatedValue = "testUpdatedValue";
		render(<SearchPage />);
		const inputs = screen.getAllByRole("textbox");
		fireEvent.change(inputs[0], { target: { value: expectedUpdatedValue } });
		waitFor(() => {
			expect(screen.queryByText(expectedUpdatedValue)).not.toBeNull();
		});
	});

	it("should fetch data when form is submitted", () => {
		render(<SearchPage />);
		const form = screen.getByTestId("searchForm");
		fireEvent.submit(form);
		expect(useCollectionCardSearchMock).toHaveBeenLastCalledWith(
			expect.objectContaining({ cardName: "" })
		);
	});

	it("should not allow another submission when first submission is not complete", () => {
		useCollectionCardSearchMock.mockReturnValue({
			isLoading: true,
			error: false,
			data: undefined,
			isSuccess: false,
		} as unknown as UseQueryResult);

		render(<SearchPage />);
		const form = screen.getByTestId("searchForm");
		fireEvent.submit(form);
		expect(useCollectionCardSearchMock).not.toHaveBeenLastCalledWith(
			expect.objectContaining({ cardName: "" })
		);
	});

	it("should render CollectionSearchForm", () => {
		render(<SearchPage />);
		expect(collectionSearchFormSpy).toHaveBeenCalled();
	});
});
