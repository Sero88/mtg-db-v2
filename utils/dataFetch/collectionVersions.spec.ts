/**
 * @jest-environment node
 */
import { DbModelResponseEnum } from "@/types/utils";
import { getCollectionVersions } from "./collectionVersions";
import { CardCollection } from "@/models/cardCollection";
import { collectionVersionsMock } from "@/tests/mocks/collectionVersions.mock";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getVersionsSpy = jest.spyOn(CardCollection.prototype, "getAllVersions");

describe("getCollectionVersions", () => {
	beforeEach(() => {
		dbConnectSpy.mockResolvedValue(true);
		getVersionsSpy.mockResolvedValue({
			status: DbModelResponseEnum.SUCCESS,
			data: collectionVersionsMock,
		});
	});
	it("should return null when db is not connected", async () => {
		dbConnectSpy.mockResolvedValue(false);
		const types = await getCollectionVersions();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});

	it("should return types", async () => {
		const types = await getCollectionVersions();

		expect(types.success).toEqual(true);
		expect(types.data).toEqual(collectionVersionsMock);
	});

	it("should return null when retrieval was not successful", async () => {
		getVersionsSpy.mockResolvedValue({ status: DbModelResponseEnum.ERROR, data: {} });
		const types = await getCollectionVersions();

		expect(types.success).toEqual(false);
		expect(types.data).toEqual(null);
	});
});
