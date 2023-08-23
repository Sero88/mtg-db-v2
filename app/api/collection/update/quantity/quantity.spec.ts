/**
 * @jest-environment node
 */
import { PATCH } from "@/app/api/collection/update/quantity/route";
import { CardCollection } from "@/models/cardCollection";
import { nissaVastwoodSeerCollectionVersion } from "@/tests/mocks/collectionCard.mock";
import { nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";
import { DbModelResponseEnum } from "@/types/utils";

const dbConnectSpy = jest.spyOn(CardCollection.prototype, "dbConnect");
const setQuantitySpy = jest.spyOn(CardCollection.prototype, "setQuantity");
process.env.DATABASE_URL = "test";
let req: Request;

describe("API route: /api/scryfall/cards", () => {
	describe("PATCH", () => {
		beforeEach(() => {
			req = new Request("http://localhost:3000/api/collection/update/quantity", {
				method: "PATCH",
				body: JSON.stringify({
					card: nissaVastwoodSeer,
					quantity: {
						[CollectionCardQuantityTypeEnum.REGULAR]: "",
						[CollectionCardQuantityTypeEnum.FOIL]: 1,
					},
					type: CollectionCardQuantityTypeEnum.FOIL,
				}),
			});
		});
		it("should return error if unable to connect to db", async () => {
			dbConnectSpy.mockResolvedValue(false);
			const response = await PATCH(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(500);
			expect(cardResults).toEqual(
				expect.objectContaining({ error: "Unable to connect to database." })
			);
		});

		it("should return object with updated quantities", async () => {
			dbConnectSpy.mockResolvedValue(true);
			setQuantitySpy.mockResolvedValue({
				status: DbModelResponseEnum.SUCCESS,
				data: nissaVastwoodSeerCollectionVersion,
			});

			const response = await PATCH(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(true);
			expect(cardResults.data).toEqual(nissaVastwoodSeerCollectionVersion);
		});

		it("should return status 400 when retrieval is unsuccessful", async () => {
			dbConnectSpy.mockResolvedValue(true);
			setQuantitySpy.mockResolvedValue({
				status: DbModelResponseEnum.ERROR,
				data: {},
			});

			const response = await PATCH(req);
			const cardResults = await response.json();

			expect(response.status).toEqual(400);
			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual({});
		});
	});
});
