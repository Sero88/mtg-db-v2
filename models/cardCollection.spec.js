/**
 * @jest-environment node
 */
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import { CardCollection } from "./cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { CollectionCardUtil } from "@/utils/CollectionCardUtil";
import { elvishMystic, nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import {
	elvishMysticCollectionCard,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";
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

	describe("upsertVersion", () => {
		it("should upsert card version", async () => {
			const cardVersion = CollectionCardUtil.buildVersionObject(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.FOIL]: 1,
				},
				CollectionCardQuantityTypeEnum.FOIL
			);

			const result = await cardCollection.upsertVersion(cardVersion);

			expect(result).toEqual(nissaVastwoodSeerCollectionVersion);
		});
	});

	describe("removeCard", () => {
		it("should remove a card object", async () => {
			const result = await cardCollection.removeCardObject(elvishMystic);

			const card = CollectionCardUtil.buildCardQueryObject(elvishMystic);
			await cardCollection.upsertCard(card);

			expect(result).toEqual(true);
		});
	});

	describe("removeVersion", () => {
		it("should remove card version", async () => {
			const result = await cardCollection.removeCardVersion(nissaVastwoodSeer);

			const cardVersion = CollectionCardUtil.buildVersionObject(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.FOIL]: 1,
				},
				CollectionCardQuantityTypeEnum.FOIL
			);

			await cardCollection.upsertVersion(cardVersion);

			expect(result).toEqual(true);
		});
	});

	describe("isCardObjectUsedByOtherVersions", () => {
		it("should return true when card object is  being used", async () => {
			const isBeingUsed = await cardCollection.isCardObjectUsedByOtherVersions(elvishMystic);

			expect(isBeingUsed).toEqual(true);
		});

		it("should return false when card is not being used", async () => {
			const isBeingUsed = await cardCollection.isCardObjectUsedByOtherVersions({
				...elvishMystic,
				oracle_id: "fakeOracleId",
			});

			expect(isBeingUsed).toEqual(false);
		});
	});
});
