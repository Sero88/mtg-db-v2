/**
 * @jest-environment node
 */
import { DbModelResponseEnum } from "@/types/utils";
import { getCollectionTypes } from "./collectionTypes";
import { CardCollection } from "@/models/cardCollection";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getTypesSpy = jest.spyOn(CardCollection.prototype, "getTypes");

const mockTypes = ["Elf", "Dragon"];

describe("getCollectionTypes", () => {
	beforeEach(() => {
		dbConnectSpy.mockResolvedValue(true);
		getTypesSpy.mockResolvedValue({
			status: DbModelResponseEnum.SUCCESS,
			data: mockTypes,
		});
	});
	it("should return null when db is not connected", async () => {
		dbConnectSpy.mockResolvedValue(false);
		const types = await getCollectionTypes();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});

	it("should return types", async () => {
		const types = await getCollectionTypes();

		expect(types.success).toEqual(true);
		expect(types.data).toEqual(mockTypes);
	});

	it("should return null when retrieval was not successful", async () => {
		getTypesSpy.mockResolvedValue({ status: DbModelResponseEnum.ERROR, data: {} });
		const types = await getCollectionTypes();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});
});
