import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UpdatePrices } from "./UpdatePrices";
import axios from "axios";
import {
	elvishMysticCollectionCardWithVersions,
	elvishMysticCollectionVersion,
	nissaVastwoodSeerCollectionCardWithVersion,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import * as FailedToUpdateCardsComponent from "./FailedToUpdateCards";
import * as DisplayErrorComponent from "@/components/utils/DisplayError";

jest.mock("./FailedToUpdateCards", () => {
	const originalModule = jest.requireActual("./FailedToUpdateCards");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/utils/DisplayError", () => {
	const originalModule = jest.requireActual("@/components/utils/DisplayError");
	return {
		__esModule: true,
		...originalModule,
	};
});

const updateCompleteCallback = jest.fn();
const axiosGetSpy = jest.spyOn(axios, "get");
const axiosPatchSpy = jest.spyOn(axios, "patch");
axiosGetSpy.mockResolvedValue({ data: {} });
HTMLAnchorElement.prototype.click = jest.fn();

const failedToUpdateCardsSpy = jest.spyOn(FailedToUpdateCardsComponent, "FailedToUpdateCards");
failedToUpdateCardsSpy.mockImplementation(() => <></>);

const displayErrorSpy = jest.spyOn(DisplayErrorComponent, "DisplayError");

describe("UpdatePrices", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should fetch and update prices button is clicked", async () => {
		axiosGetSpy.mockResolvedValueOnce({
			data: { data: [elvishMysticCollectionVersion, nissaVastwoodSeerCollectionVersion] },
		});
		axiosGetSpy.mockResolvedValueOnce({ data: { download_uri: "test/download" } });
		axiosGetSpy.mockResolvedValueOnce({
			data: [
				{
					id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
					prices: { usd: "23.2", usd_foil: "42" },
				},
				{
					id: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
					prices: { usd: "23.2", usd_foil: "42" },
				},
			],
		});
		axiosPatchSpy.mockResolvedValue({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({
			data: {
				data: [
					elvishMysticCollectionCardWithVersions,
					nissaVastwoodSeerCollectionCardWithVersion,
				],
			},
		});

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/versions");
			expect(axiosGetSpy).toHaveBeenCalledWith(
				"https://api.scryfall.com/bulk-data/default-cards/?format=json"
			);
			expect(axiosGetSpy).toHaveBeenCalledWith("test/download");
			expect(axiosPatchSpy).toHaveBeenCalledWith("/api/collection/update", {
				scryfallId: elvishMysticCollectionVersion.scryfallId,
				prices: { usd: "23.2", usd_foil: "42" },
			});
			expect(axiosPatchSpy).toHaveBeenCalledWith("/api/collection/update", {
				scryfallId: nissaVastwoodSeerCollectionVersion.scryfallId,
				prices: { usd: "23.2", usd_foil: "42" },
			});
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection");
		});
	});

	it("should show error when fetch collection fails", async () => {
		axiosGetSpy.mockRejectedValue(new Error("test error"));

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);

		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/versions");
			expect(displayErrorSpy).toHaveBeenCalledWith(
				{
					errorMessage:
						"Error: Unable to retrieve cards from collection. Please try again later.",
				},
				{}
			);
		});
	});

	it("should show price error when fetch collection fails to get price", async () => {
		axiosGetSpy.mockResolvedValueOnce({ data: {} });
		axiosGetSpy.mockRejectedValueOnce(new Error("test"));

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);

		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/versions");
			expect(screen.queryByText("Error: Unable to retrieve price data.")).not.toBeNull();
		});
	});

	it("should show error when it fails to download collection", async () => {
		axiosGetSpy.mockResolvedValueOnce({
			data: { data: [elvishMysticCollectionVersion, nissaVastwoodSeerCollectionVersion] },
		});
		axiosGetSpy.mockResolvedValueOnce({ data: { download_uri: "test/download" } });
		axiosGetSpy.mockResolvedValueOnce({
			data: [
				{
					id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
					prices: { usd: "23.2", usd_foil: "42" },
				},
				{
					id: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
					prices: { usd: "23.2", usd_foil: "42" },
				},
			],
		});
		axiosPatchSpy.mockResolvedValue({ data: {} });
		axiosGetSpy.mockRejectedValueOnce(new Error("unable to get collection"));

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection/versions");
			expect(axiosGetSpy).toHaveBeenCalledWith(
				"https://api.scryfall.com/bulk-data/default-cards/?format=json"
			);
			expect(axiosGetSpy).toHaveBeenCalledWith("test/download");
			expect(axiosPatchSpy).toHaveBeenCalledWith("/api/collection/update", {
				scryfallId: elvishMysticCollectionVersion.scryfallId,
				prices: { usd: "23.2", usd_foil: "42" },
			});
			expect(axiosPatchSpy).toHaveBeenCalledWith("/api/collection/update", {
				scryfallId: nissaVastwoodSeerCollectionVersion.scryfallId,
				prices: { usd: "23.2", usd_foil: "42" },
			});
			expect(axiosGetSpy).toHaveBeenCalledWith("/api/collection");
			expect(screen.queryByText("Error: Unable to download collection.")).not.toBeNull();
		});
	});

	it("should run updateCompleteCallback when process is complete", async () => {
		axiosGetSpy.mockResolvedValueOnce({
			data: { data: [elvishMysticCollectionVersion, nissaVastwoodSeerCollectionVersion] },
		});
		axiosGetSpy.mockResolvedValueOnce({ data: { download_uri: "test/download" } });
		axiosGetSpy.mockResolvedValueOnce({
			data: [
				{
					id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
					prices: { usd: "23.2", usd_foil: "42" },
				},
				{
					id: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
					prices: { usd: "23.2", usd_foil: "42" },
				},
			],
		});
		axiosPatchSpy.mockResolvedValue({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({
			data: {
				data: [
					elvishMysticCollectionCardWithVersions,
					nissaVastwoodSeerCollectionCardWithVersion,
				],
			},
		});

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(updateCompleteCallback).toHaveBeenCalled();
		});
	});

	it("should show FailedToUpdate cards when there's an error updating prices", async () => {
		axiosGetSpy.mockResolvedValueOnce({
			data: { data: [elvishMysticCollectionVersion, nissaVastwoodSeerCollectionVersion] },
		});
		axiosGetSpy.mockResolvedValueOnce({ data: { download_uri: "test/download" } });
		axiosGetSpy.mockResolvedValueOnce({
			data: [
				{
					id: "60d0e6a6-629a-45a7-bfcb-25ba7156788b",
					prices: { usd: "23.2", usd_foil: "42" },
				},
				{
					id: "008b1ea5-1a8d-4a9d-b208-421fea2f9c58",
					prices: { usd: "23.2", usd_foil: "42" },
				},
			],
		});
		axiosPatchSpy.mockRejectedValue({ data: {} });
		axiosGetSpy.mockResolvedValueOnce({
			data: {
				data: [
					elvishMysticCollectionCardWithVersions,
					nissaVastwoodSeerCollectionCardWithVersion,
				],
			},
		});

		render(<UpdatePrices updateCompleteCallback={updateCompleteCallback} />);
		const button = screen.getByRole("button", { name: "Update Prices" });

		fireEvent.click(button);

		await waitFor(() => {
			expect(failedToUpdateCardsSpy).toHaveBeenCalled();
		});
	});
});
