import { render, screen } from "@testing-library/react";
import { SetSearch } from "./SetSearch";
import { setsList } from "@/tests/mocks/setsList.mock";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";

const selectedSet = "test";
const setChangeHandler = jest.fn();

describe("NameSearch Component", () => {
	it("should display list of sets", () => {
		render(
			<ScryfallSetDataContext.Provider value={setsList}>
				<SetSearch selectedSet={selectedSet} setChangeHandler={setChangeHandler} />
			</ScryfallSetDataContext.Provider>
		);

		expect(screen.queryAllByText(/^Set Name [0-9]?/).length).toEqual(2);
	});
});
