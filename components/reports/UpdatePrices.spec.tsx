import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UpdatePrices } from "./UpdatePrices";
import axios from "axios";

const updateCompleteCallback = jest.fn();
const axiosGetSpy = jest.spyOn(axios, "get");
axiosGetSpy.mockResolvedValue({ data: {} });

describe("UpdatePrices", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should fetch all collection and price data when update prices button is clicked", async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({ data: { download_uri: "test/download" } });

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/");
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/versions?action=count");
			expect(axiosGetSpy).toHaveBeenCalledWith(
				"https://api.scryfall.com/bulk-data/default-cards/?format=json"
			);
			expect(axiosGetSpy).toHaveBeenCalledWith("test/download");
		});
	});

	it("should show error when fetch collection fails", async () => {
		axiosGetSpy.mockRejectedValue(new Error("test error"));

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);

		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/");
			expect(
				screen.queryByText(
					"Error: Unable to retrieve cards from collection. Please try again later."
				)
			).not.toBeNull();
		});
	});

	it("should show price error when fetch collection fails to get price", async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({ data: {} });
		axiosGetSpy.mockRejectedValueOnce(new Error("test"));

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);

		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/");
			expect(screen.queryByText("Error: Unable to retrieve price data.")).not.toBeNull();
		});
	});
});
