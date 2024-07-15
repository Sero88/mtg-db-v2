import axios from "axios";
import { fetchCollection } from "./collection";
import {
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCardWithVersion,
} from "@/tests/mocks/collectionCard.mock";

const axiosGetSpy = jest.spyOn(axios, "get");

const collectionApiPath = "/api/collection/test/path";
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
	it("should call path passed", async () => {
		const result = await fetchCollection(collectionApiPath);

		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
	});

	it("should return data with resolved data", async () => {
		const result = await fetchCollection(collectionApiPath);

		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
		expect(result).toEqual({
			success: true,
			data: [
				elvishMysticCollectionCardWithVersions,
				nissaVastwoodSeerCollectionCardWithVersion,
			],
		});
	});

	it("should return success as false and data null when fetch fails", async () => {
		axiosGetSpy.mockRejectedValue("Something went wrong");

		const result = await fetchCollection(collectionApiPath);
		expect(axiosGetSpy).toHaveBeenCalledWith(collectionApiPath);
		expect(result).toEqual({
			success: false,
			data: null,
		});
	});
});
