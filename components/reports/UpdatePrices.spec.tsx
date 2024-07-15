import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UpdatePrices } from "./UpdatePrices";
import * as FetchCollectionUtil from "@/utils/dataFetch/clientSide/collection";

const updateCompleteCallback = jest.fn();

jest.mock("@/utils/dataFetch/clientSide/collection", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/clientSide/collection");

	return {
		__esModule: true,
		...originalModule,
	};
});

const fetchCollectionSpy = jest.spyOn(FetchCollectionUtil, "fetchCollection");
fetchCollectionSpy.mockResolvedValue({ success: true, data: {} });

describe("UpdatePrices", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should fetch collection when update prices button is clicked", async () => {
		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(fetchCollectionSpy).toHaveBeenCalledWith("/api/collection/");
			expect(fetchCollectionSpy).toHaveBeenCalledWith(
				"/api/collection/versions?action=count"
			);
		});
	});

	it("should show error when fetch collection fails", async () => {
		fetchCollectionSpy.mockResolvedValue({ success: false, data: {} });

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);

		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(fetchCollectionSpy).toHaveBeenCalledWith("/api/collection/");
			expect(fetchCollectionSpy).toHaveBeenCalledWith(
				"/api/collection/versions?action=count"
			);
		});

		expect(
			screen.queryByText(
				"Error: Unable to retrieve cards from collection. Please try again later."
			)
		).not.toBeNull();
	});
});
