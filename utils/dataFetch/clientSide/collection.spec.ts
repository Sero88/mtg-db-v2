import axios from "axios";
import { fetchCollection } from "./collection";
import {
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCardWithVersion,
} from "@/tests/mocks/collectionCard.mock";

const axiosGetSpy = jest.spyOn(axios, "get");

const collectionApiPath = "/api/collection/";
describe("fetchCollection", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		axiosGetSpy.mockResolvedValue({
			data: {
				data: [
					elvishMysticCollectionCardWithVersions,
					nissaVastwoodSeerCollectionCardWithVersion,
				],
			},
		});
	});
	it("should call /api/collection api", async () => {
		const result = await fetchCollection();

		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
	});

	it("should return all card in collection along with their versions", async () => {
		const result = await fetchCollection();

		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
		expect(result).toEqual({
			success: true,
			data: [
				elvishMysticCollectionCardWithVersions,
				nissaVastwoodSeerCollectionCardWithVersion,
			],
		});
	});

	it("should return success false and data null when fetch fails", async () => {
		axiosGetSpy.mockRejectedValue("Something went wrong");

		const result = await fetchCollection();
		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
		expect(result).toEqual({
			success: false,
			data: null,
		});
	});
});
