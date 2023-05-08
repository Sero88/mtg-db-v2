import { ScryfallSearchForm } from "./ScryfallSearchForm";
import { fireEvent, render, screen } from "@testing-library/react";
import * as NameSearchComponent from "./NameSearch";
import { SetSearch } from "./SetSearch";

jest.mock("./NameSearch", () => {
	const originalModule = jest.requireActual("./NameSearch");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("./SetSearch", () => {
	const originalModule = jest.requireActual("./SetSearch");
	return {
		__esModule: true,
		...originalModule,
		SetSearch: jest.fn().mockImplementation(() => "Card Set"),
	};
});

const nameSearchSpy = jest.spyOn(NameSearchComponent, "NameSearch");

describe("ScryfallSearchForm", () => {
	it("should display NameSearch component", () => {
		render(<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />);
		expect(nameSearchSpy).toHaveBeenCalled();
	});

	it("should display SetSearch component", () => {
		render(<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />);
		expect(SetSearch).toHaveBeenCalled();
	});

	it("should disable search button", () => {
		render(<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={true} />);
		const searchButton = screen.queryByText(/Search/);
		expect(searchButton).toHaveProperty("disabled", true);
	});

	it("should not submit form when disabled", () => {
		const submitMock = jest.fn();
		render(<ScryfallSearchForm onSubmitSearch={submitMock} disabled={true} />);
		const addSearchForm = screen.queryByTestId("addSearchForm");

		fireEvent.submit(addSearchForm as HTMLElement);

		expect(submitMock).not.toHaveBeenCalled();
	});
});
