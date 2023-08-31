/**
 * @jest-environment node
 */
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import { CardCollection } from "./cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { CollectionCardUtil } from "@/utils/CollectionCardUtil";
import {
	elvishMystic,
	nissaVastwoodSeer,
	elvishMysticLordOfTheRingsPrint,
} from "@/tests/mocks/scryfallCard.mock";
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
	const upsertCardSpy = jest.spyOn(cardCollection, "upsertCard");
	const upsertVersionSpy = jest.spyOn(cardCollection, "upsertVersion");

	beforeAll(async () => {
		await cardCollection.dbConnect();
	});

	afterAll(async () => {
		await cardCollection.dbDisconnect();
	});

	beforeEach(() => {
		jest.resetAllMocks();
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
			const cardVersion = CollectionCardUtil.buildVersionQueryObject(
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
		it("should remove only version but not card object", async () => {
			const removeResult = await cardCollection.removeCard(elvishMysticLordOfTheRingsPrint);

			const isBeingUsed = await cardCollection.isCardObjectUsedByOtherVersions(
				elvishMysticLordOfTheRingsPrint
			);

			const card = CollectionCardUtil.buildVersionQueryObject(
				elvishMysticLordOfTheRingsPrint,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 1,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);
			await cardCollection.upsertVersion(card);

			expect(removeResult).toEqual(true);
			expect(isBeingUsed).toEqual(true);
		});
		it("should remove both version and card object", async () => {
			const removeResult = await cardCollection.removeCard(nissaVastwoodSeer);

			const isBeingUsed = await cardCollection.isCardObjectUsedByOtherVersions(
				nissaVastwoodSeer
			);

			const version = CollectionCardUtil.buildVersionQueryObject(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 1,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);
			await cardCollection.upsertVersion(version);

			const cardObject = CollectionCardUtil.buildCardQueryObject(nissaVastwoodSeer);
			await cardCollection.upsertCard(cardObject);

			expect(removeResult).toEqual(true);
			expect(isBeingUsed).toEqual(false);
		});
	});

	describe("removeCardObject", () => {
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

			const cardVersion = CollectionCardUtil.buildVersionQueryObject(
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

	describe("setQuantity", () => {
		it("should remove card when both quantities are set to zero", async () => {
			const resultRemove = await cardCollection.setQuantity(
				elvishMystic,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: 0,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			await cardCollection.setQuantity(
				elvishMystic,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 1,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			expect(resultRemove?.status).toEqual(DbModelResponseEnum.SUCCESS, {
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: 0,
				},
			});
		});

		it("should return error when is not able to remove card", async () => {
			const resultRemove = await cardCollection.setQuantity(
				{ ...elvishMystic, id: "123FAKE" },
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: 0,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			expect(resultRemove?.status).toEqual(DbModelResponseEnum.ERROR);
		});

		it("should return error when quantities are both empty", async () => {
			const resultRemove = await cardCollection.setQuantity(
				elvishMystic,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: "",
					[CollectionCardQuantityTypeEnum.FOIL]: "",
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			expect(resultRemove?.status).toEqual(DbModelResponseEnum.ERROR);
			expect(resultRemove.data).toEqual("Quantity can't be less than 0");
		});

		it("should return error when unable to upsert card", async () => {
			upsertCardSpy.mockResolvedValue(false);
			const result = await cardCollection.setQuantity(
				elvishMystic,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 1,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			expect(result.status).toEqual(DbModelResponseEnum.ERROR);
			expect(result.data).toEqual("Unable to upsert card. Check server logs.");
		});

		it("should return error when unable to upsert version", async () => {
			upsertVersionSpy.mockResolvedValue(false);
			const result = await cardCollection.setQuantity(
				elvishMystic,
				{
					[CollectionCardQuantityTypeEnum.REGULAR]: 1,
				},
				CollectionCardQuantityTypeEnum.REGULAR
			);

			expect(result.status).toEqual(DbModelResponseEnum.ERROR);
			expect(result.data).toEqual("Unable to upsert version. Check server logs.");
		});

		it("should return success when quantity was set correctly", async () => {
			const result = await cardCollection.setQuantity(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.FOIL]: 3,
				},
				CollectionCardQuantityTypeEnum.FOIL
			);

			await cardCollection.setQuantity(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.FOIL]: 1,
				},
				CollectionCardQuantityTypeEnum.FOIL
			);

			expect(result.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(result.data).toEqual({
				...nissaVastwoodSeerCollectionVersion,
				quantity: { [CollectionCardQuantityTypeEnum.FOIL]: 3 },
			});
		});
	});
});
