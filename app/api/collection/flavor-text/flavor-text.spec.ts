/**
 * @jest-environment node
 */
import { GET } from "@/app/api/collection/flavor-text/route";
import { CardCollection } from "@/models/cardCollection";
import { elvishMysticCollectionCard } from "@/tests/mocks/collectionCard.mock";
import { DbModelResponseEnum } from "@/types/utils";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getDailyFlavorTextSpy = jest.spyOn(CardCollection.prototype, "getDailyFlavorText");
process.env.DATABASE_URL = "test";

describe("API route: /api/scryfall/collection/flavor-text", () => {
	describe("GET", () => {
		it("should return error if unable to connect to db", async () => {
			dbConnectSpy.mockResolvedValue(false);
			const response = await GET();
			const cardResults = await response.json();

			expect(response.status).toEqual(500);
			expect(cardResults).toEqual(
				expect.objectContaining({ error: "Unable to connect to database." })
			);
		});

		it("should return result with flavor text", async () => {
			const expectedResults = [elvishMysticCollectionCard];
			dbConnectSpy.mockResolvedValue(true);
			getDailyFlavorTextSpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: expectedResults,
			});

			const response = await GET();
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data[0].cardFaces[0].flavorText).toBeTruthy();
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getDailyFlavorTextSpy.mockResolvedValue({
				status: DbModelResponseEnum.ERROR,
				data: {},
			});

			const response = await GET();
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual({});
		});
	});
});
