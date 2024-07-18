/**
 * @jest-environment node
 */
import { GET } from "@/app/api/collection/versions/route";
import { CardCollection } from "@/models/cardCollection";
import {
	elvishMysticCollectionVersion,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { DbModelResponseEnum } from "@/types/utils";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getVersionsSpy = jest.spyOn(CardCollection.prototype, "getAllVersions");
process.env.DATABASE_URL = "test";
let req: Request;

describe("API route: /api/collection/versions", () => {
	beforeEach(() => {
		req = new Request("http://localhost:3000/api/collection/versions", {
			method: "GET",
		});
	});
	describe("GET", () => {
		it("should return error if unable to connect to db", async () => {
			dbConnectSpy.mockResolvedValue(false);
			const response = await GET(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(500);
			expect(cardResults).toEqual(
				expect.objectContaining({ error: "Unable to connect to database." })
			);
		});

		it("should return results", async () => {
			const expectedResults = [
				elvishMysticCollectionVersion,
				nissaVastwoodSeerCollectionVersion,
			];
			dbConnectSpy.mockResolvedValue(true);
			getVersionsSpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: expectedResults,
			});

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data).toEqual(expectedResults);
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getVersionsSpy.mockResolvedValue({
				status: DbModelResponseEnum.ERROR,
				data: {},
			});

			const response = await GET(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual({});
		});
	});
});
