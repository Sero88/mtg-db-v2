/**
 * @jest-environment node
 */
import { POST } from "@/app/api/collection/search/route";
import { CardCollection } from "@/models/cardCollection";
import { nissaVastwoodSeerCollectionVersion } from "@/tests/mocks/collectionCard.mock";
import { DbModelResponseEnum } from "@/types/utils";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const getCardsSpy = jest.spyOn(CardCollection.prototype, "getCards");
process.env.DATABASE_URL = "test";
let req: Request;

describe("API route: /api/scryfall/collection/search", () => {
	describe("POST", () => {
		beforeEach(() => {
			req = new Request("http://localhost:3000/api/collection/search", {
				method: "POST",
				body: JSON.stringify({
					searchQuery: {
						name: "Elvish Mystic",
					},
				}),
			});
		});
		it("should return error if unable to connect to db", async () => {
			dbConnectSpy.mockResolvedValue(false);
			const response = await POST(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(500);
			expect(cardResults).toEqual(
				expect.objectContaining({ error: "Unable to connect to database." })
			);
		});

		it("should return search results", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getCardsSpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: nissaVastwoodSeerCollectionVersion,
			});

			const response = await POST(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data).toEqual(nissaVastwoodSeerCollectionVersion);
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			getCardsSpy.mockResolvedValue({
				status: DbModelResponseEnum.ERROR,
				data: {},
			});

			const response = await POST(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual({});
		});
	});
});
