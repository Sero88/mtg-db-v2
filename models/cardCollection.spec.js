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
	elvishMysticCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";
const mockIds = cardsWithRegularAndFoilQuantities.map((card) => {
	return card.scryfallId;
});

const noDbConnectionResult = { data: {}, status: DbModelResponseEnum.ERROR };

const cardCollectionNoConnection = new CardCollection();

describe("CardCollection Model", () => {
	const cardCollection = new CardCollection();
	const upsertCardSpy = jest.spyOn(cardCollection, "upsertCard");
	const upsertVersionSpy = jest.spyOn(cardCollection, "upsertVersion");
	const getCardVersionSpy = jest.spyOn(cardCollection, "getCardVersion");

	beforeAll(async () => {
		await cardCollection.dbConnect();
	});

	afterAll(async () => {
		await cardCollection.dbDisconnect();
	});

	beforeEach(() => {
		jest.clearAllMocks();
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

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.getQuantitiesByIds(mockIds);
			expect(results).toEqual(noDbConnectionResult);
		});
	});

	describe("upsertCard", () => {
		it("should upsert a card", async () => {
			const card = CollectionCardUtil.buildCardQueryObject(elvishMystic);
			const results = await cardCollection.upsertCard(card);

			expect(results).toEqual(elvishMysticCollectionCard);
		});

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.upsertCard(elvishMystic);
			expect(results).toEqual(noDbConnectionResult);
		});
	});

	describe("upsertVersion", () => {
		const cardVersion = CollectionCardUtil.buildVersionQueryObject(
			nissaVastwoodSeer,
			1,
			CollectionCardQuantityTypeEnum.FOIL
		);

		it("should upsert card version", async () => {
			const result = await cardCollection.upsertVersion(cardVersion);

			expect(result).toEqual(nissaVastwoodSeerCollectionVersion);
		});

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.upsertVersion(cardVersion);
			expect(results).toEqual(noDbConnectionResult);
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
				1,
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
				1,
				CollectionCardQuantityTypeEnum.FOIL
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

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.removeCardObject(elvishMystic);
			expect(results).toEqual(noDbConnectionResult);
		});
	});

	describe("removeVersion", () => {
		const cardVersion = CollectionCardUtil.buildVersionQueryObject(
			nissaVastwoodSeer,
			1,
			CollectionCardQuantityTypeEnum.FOIL
		);
		it("should remove card version", async () => {
			const result = await cardCollection.removeCardVersion(nissaVastwoodSeer);

			await cardCollection.upsertVersion(cardVersion);

			expect(result).toEqual(true);
		});

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.removeCardVersion(cardVersion);
			expect(results).toEqual(noDbConnectionResult);
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

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.isCardObjectUsedByOtherVersions({
				...elvishMystic,
				oracle_id: "fakeOracleId",
			});
			expect(results).toEqual(noDbConnectionResult);
		});
	});

	describe("setQuantity", () => {
		it("should remove card when both quantities are set to zero", async () => {
			const resultRemove = await cardCollection.setQuantity(
				elvishMystic,
				CollectionCardQuantityTypeEnum.REGULAR,
				0
			);

			await cardCollection.setQuantity(
				elvishMystic,
				CollectionCardQuantityTypeEnum.REGULAR,
				1
			);

			expect(resultRemove?.status).toEqual(DbModelResponseEnum.SUCCESS, {
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: 0,
				},
			});
		});

		it("should return error when is not able to remove card", async () => {
			getCardVersionSpy.mockResolvedValue(elvishMysticCollectionVersion);
			const resultRemove = await cardCollection.setQuantity(
				{ ...elvishMystic, id: "123FAKE" },
				CollectionCardQuantityTypeEnum.REGULAR,
				0
			);

			expect(resultRemove?.status).toEqual(DbModelResponseEnum.ERROR);
		});

		it("should return error when unable to upsert card", async () => {
			upsertCardSpy.mockResolvedValue(false);
			const result = await cardCollection.setQuantity(
				elvishMystic,
				CollectionCardQuantityTypeEnum.REGULAR,
				1
			);

			expect(result.status).toEqual(DbModelResponseEnum.ERROR);
			expect(result.data).toEqual("Unable to upsert card. Check server logs.");
		});

		it("should return error when unable to upsert version", async () => {
			upsertCardSpy.mockResolvedValue(true);
			upsertVersionSpy.mockResolvedValue(false);
			const result = await cardCollection.setQuantity(
				elvishMystic,
				CollectionCardQuantityTypeEnum.REGULAR,
				1
			);

			expect(result.status).toEqual(DbModelResponseEnum.ERROR);
			expect(result.data).toEqual("Unable to upsert version. Check server logs.");
		});

		it("should return success when quantity was set correctly", async () => {
			//todo: avoid mocking responses for these spies in the first place?
			upsertCardSpy.mockRestore();
			upsertVersionSpy.mockRestore();
			const result = await cardCollection.setQuantity(
				nissaVastwoodSeer,
				CollectionCardQuantityTypeEnum.FOIL,
				3
			);

			await cardCollection.setQuantity(
				nissaVastwoodSeer,
				CollectionCardQuantityTypeEnum.FOIL,
				1
			);

			expect(result.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(result.data).toEqual({
				...nissaVastwoodSeerCollectionVersion,
				quantity: { [CollectionCardQuantityTypeEnum.FOIL]: 3 },
			});
		});
	});
	describe("getCards", () => {
		const cardName = "+2 Mace";
		const cardText = "{T}: Add {G}";
		it("should get search results by card name", async () => {
			const results = await cardCollection.getCards({ cardName });

			expect(results?.data[0]?.name).toEqual(cardName);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by card text", async () => {
			const results = await cardCollection.getCards({ cardText });

			expect(results?.data[0]?.cardFaces[0].oracleText).toMatch(cardText);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});
	});
	describe("getTypes", () => {
		it("should get types from collection", async () => {
			const results = await cardCollection.getTypes();

			expect(Array.isArray(results?.data)).toEqual(true);
			expect(results?.data.includes("Elf")).toEqual(true);
		});

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.getTypes();
			expect(results).toEqual(noDbConnectionResult);
		});
	});
});
