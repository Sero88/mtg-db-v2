/**
 * @jest-environment node
 */
import { DbModelResponseEnum } from "@/types/utils";
import { getCollectionSets } from "./collectionSets";
import { CardCollection } from "@/models/cardCollection";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getSetsSpy = jest.spyOn(CardCollection.prototype, "getSets");

const mockTypes = ["m10", "uno"];

describe("getCollectionSets", () => {
	beforeEach(() => {
		dbConnectSpy.mockResolvedValue(true);
		getSetsSpy.mockResolvedValue({
			status: DbModelResponseEnum.SUCCESS,
			data: mockTypes,
		});
	});
	it("should return null when db is not connected", async () => {
		dbConnectSpy.mockResolvedValue(false);
		const types = await getCollectionSets();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});

	it("should return sets", async () => {
		const types = await getCollectionSets();

		expect(types.success).toEqual(true);
		expect(types.data).toEqual(mockTypes);
	});

	it("should return null when retrieval was not successful", async () => {
		getSetsSpy.mockResolvedValue({ status: DbModelResponseEnum.ERROR, data: {} });
		const types = await getCollectionSets();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});
});
