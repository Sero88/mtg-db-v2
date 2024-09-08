/**
 * @jest-environment node
 */
import { GET } from "@/app/api/collection/route";
import { CardCollection } from "@/models/cardCollection";
import {
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { DbModelResponseEnum } from "@/types/utils";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getCardsSpy = jest.spyOn(CardCollection.prototype, "getAllCardsWithVersions");
process.env.DATABASE_URL = "test";
let req: Request;

describe("API route: /api/scryfall/collection", () => {
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

		it("should return results", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getCardsSpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: elvishMysticCollectionCardWithVersions,
			});

			const response = await GET();
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data).toEqual(elvishMysticCollectionCardWithVersions);
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getCardsSpy.mockResolvedValue({
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
