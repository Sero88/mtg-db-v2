/**
 * @jest-environment node
 */
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import { CardCollection } from "./cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { CollectionCardUtil } from "@/utils/CollectionCardUtil";
import { elvishMystic } from "@/tests/mocks/scryfallCard.mock";
import { elvishMysticCollectionCard } from "@/tests/mocks/collectionCard.mock";

const mockIds = cardsWithRegularAndFoilQuantities.map((card) => {
	return card.scryfallId;
});

describe("CardCollection Model", () => {
	const cardCollection = new CardCollection();

	beforeAll(async () => {
		await cardCollection.dbConnect();
	});

	afterAll(async () => {
		await cardCollection.dbDisconnect();
	});

	describe("getQuantitiesByIds", () => {
		it("should return list from db", async () => {
			const results = await cardCollection.getQuantitiesByIds(mockIds);

			expect(results).toEqual({
				status: DbModelResponseEnum.SUCCESS,
				data: expect.arrayContaining(cardsWithRegularAndFoilQuantities),
			});
		});

		it("should contain scryfall Id and quantity object", async () => {
			const results = await cardCollection.getQuantitiesByIds(mockIds);
			results?.data.forEach((result) => {
				expect(result).toEqual(
					expect.objectContaining({
						scryfallId: expect.anything(),
						quantity: expect.anything(),
					})
				);
			});
		});
	});

	describe("upsertCard", () => {
		it("should upsert a card", async () => {
			const card = CollectionCardUtil.buildCardQueryObject(elvishMystic);
			const results = await cardCollection.upsertCard(card);

			expect(results).toEqual(elvishMysticCollectionCard);
		});
	});
});
