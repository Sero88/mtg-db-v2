/**
 * @jest-environment node
 */
import { GET } from "@/app/api/collection/search/quantity-by-id/route";
import { CardCollection } from "@/models/cardCollection";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import { DbModelResponseEnum } from "@/types/utils";

const req = new Request(
	"http://localhost:3000/api/collection/search/quantity-by-id?action=searchIds&cardIds=[%222267c580-b641-4d6f-8bd9-deb1c6393d14%22,%20%22e8534c3b-440e-4c13-a27d-819bb325c0e6%22]",
	{
		method: "GET",
	}
);

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const searchQuantitiesByIdSpy = jest.spyOn(CardCollection.prototype, "getQuantitiesByIds");
process.env.DATABASE_URL = "test";

describe("API route: /api/scryfall/cards", () => {
	describe("GET", () => {
		it("should return error if no cardIds were passed", async () => {
			const reqNoIds = new Request(
				"http://localhost:3000/api/collection/search/quantity-by-id?action=searchIds",
				{
					method: "GET",
				}
			);

			const response = await GET(reqNoIds);
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual(null);
		});

		it("should return error if unable to connect to db", async () => {
			dbConnectSpy.mockResolvedValue(false);
			const response = await GET(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(500);
			expect(cardResults).toEqual(expect.objectContaining({ error: expect.anything() }));
		});

		it("should return object with scryfall ids and their quantities", async () => {
			dbConnectSpy.mockResolvedValue(true);
			searchQuantitiesByIdSpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: cardsWithRegularAndFoilQuantities,
			});

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data).toEqual(cardsWithRegularAndFoilQuantities);
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			searchQuantitiesByIdSpy.mockResolvedValue({
				status: DbModelResponseEnum.ERROR,
				data: {},
			});

			const response = await GET(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual(null);
		});
	});
});
