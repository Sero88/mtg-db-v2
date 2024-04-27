import SearchPage from "./page";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import * as CardNameComponent from "@/components/search/fields/CardName";
import * as CardTextComponent from "@/components/search/fields/CardText";
import * as CardTypesComponent from "@/components/search/fields/CardTypes";
import * as CardColorsComponent from "@/components/search/fields/CardColors";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { UseQueryResult } from "react-query";

jest.mock("@/components/search/fields/CardName", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardName");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardText", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardText");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardTypes", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardTypes");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardColors", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardColors");

	return {
		__esModule: true,
		...originalModule,
	};
});

const cardNameSpy = jest.spyOn(CardNameComponent, "CardName");
const cardTextSpy = jest.spyOn(CardTextComponent, "CardText");
const cardTypesSpy = jest.spyOn(CardTypesComponent, "CardTypes");
const cardColorsSpy = jest.spyOn(CardColorsComponent, "CardColors");

jest.mock("@/hooks/useCollectionCardSearch");
const useCollectionCardSearchMock = jest.mocked(useCollectionCardSearch);

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

	it("should display CardName component", () => {
		render(<SearchPage />);
		expect(cardNameSpy).toHaveBeenCalled();
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

	it("should display CardText component", () => {
		render(<SearchPage />);
		expect(cardTextSpy).toHaveBeenCalled();
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

	it("should display CardTypes component", () => {
		render(<SearchPage />);
		expect(cardTypesSpy).toHaveBeenCalled();
	});

	it("should display CardColors component", () => {
		render(<SearchPage />);
		expect(cardColorsSpy).toHaveBeenCalled();
	});

	// TODO: once I add more fields, I should prove that updating one field, shouldn't reset another
});
