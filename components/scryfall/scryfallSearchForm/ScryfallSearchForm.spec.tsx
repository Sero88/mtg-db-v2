import { ScryfallSearchForm } from "./ScryfallSearchForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as NameSearchComponent from "./NameSearch";
import * as SetSearchComponent from "./SetSearch";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";
import { setsList } from "@/tests/mocks/setsList.mock";

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
	};
});

const nameSearchSpy = jest.spyOn(NameSearchComponent, "NameSearch");
const setSearchSpy = jest.spyOn(SetSearchComponent, "SetSearch");

describe("ScryfallSearchForm", () => {
	it("should display NameSearch component", () => {
		render(<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />);
		expect(nameSearchSpy).toHaveBeenCalled();
	});

	it("should display SetSearch component", () => {
		render(<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />);
		expect(setSearchSpy).toHaveBeenCalled();
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

	it("should set value update new selection is made", async () => {
		render(
			<ScryfallSetDataContext.Provider value={setsList}>
				<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />
			</ScryfallSetDataContext.Provider>
		);
		const addSetSelector = screen.getByRole("combobox");
		fireEvent.change(addSetSelector, { target: { value: "t2t" } });

		await waitFor(() => {
			expect(setSearchSpy).toHaveBeenCalledWith(
				expect.objectContaining({ selectedSet: "t2t" }),
				{}
			);
		});
	});

	it("should update card name value when card name is changed", async () => {
		const cardName = "test card name";
		render(
			<ScryfallSetDataContext.Provider value={setsList}>
				<ScryfallSearchForm onSubmitSearch={jest.fn()} disabled={false} />
			</ScryfallSetDataContext.Provider>
		);
		const nameField = screen.getByRole("textbox", { name: "Card Name:" });
		fireEvent.change(nameField, { target: { value: cardName } });

		await waitFor(() => {
			expect(nameSearchSpy).toHaveBeenCalledWith(
				expect.objectContaining({ cardName: cardName }),
				{}
			);
		});
	});
});
