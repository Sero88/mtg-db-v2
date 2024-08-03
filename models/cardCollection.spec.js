/**
 * @jest-environment node
 */
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import {
	selectorListTypeMockNoPartials,
	selectorListTypeMock,
} from "@/tests/mocks/selectorListType.mock";
import {
	colorsSelectorExactMock,
	colorsSelectorIncludeMock,
	colorsSelectorAtLeastMock,
} from "@/tests/mocks/colorSelectorType.mock";
import { CardCollection } from "./cardCollection";
import { DbModelResponseEnum } from "@/types/utils";
import { CollectionCardUtil } from "@/utils/collectionCardUtil";
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
import { cardStatsMock } from "@/tests/mocks/cardStat.mock";
import { collectionSetFromDB } from "@/tests/mocks/collectionSets.mock";
import { collectionCardRarityMock } from "@/tests/mocks/collectionRarity.mock";
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

		it("should get search results by type not allowing partials", async () => {
			const results = await cardCollection.getCards({
				cardTypes: selectorListTypeMockNoPartials,
			});

			expect(results?.data[0]?.name).toMatch("Nissa, Vastwood Seer // Nissa, Sage Animist");
			expect(results?.data.length).toEqual(1);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by type allowing partials", async () => {
			const results = await cardCollection.getCards({
				cardTypes: selectorListTypeMock,
			});

			expect(results?.data.length).toBeGreaterThan(1);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by card color with exact conditional", async () => {
			const results = await cardCollection.getCards({
				cardColors: colorsSelectorExactMock,
			});

			expect(results?.data.length).toEqual(2);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by card color with include conditional", async () => {
			const results = await cardCollection.getCards({
				cardColors: colorsSelectorIncludeMock,
			});

			expect(results?.data.length).toEqual(2);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by card color with at least conditional", async () => {
			const results = await cardCollection.getCards({
				cardColors: colorsSelectorAtLeastMock,
			});

			expect(results?.data.length).toEqual(4);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get search results by card color with no color", async () => {
			const results = await cardCollection.getCards({
				cardColors: colorsSelectorAtLeastMock,
			});

			expect(results?.data.length).toEqual(4);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
		});

		it("should get results by card stat", async () => {
			const results = await cardCollection.getCards({
				cardStats: cardStatsMock,
			});

			expect(results?.data.length).toEqual(1);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data[0].name).toEqual("Elvish Mystic");
		});

		it("should get results by card set", async () => {
			const results = await cardCollection.getCards({
				cardSets: collectionSetFromDB,
			});

			expect(results?.data.length).toEqual(1);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data[0].name).toEqual("Elvish Mystic");
		});

		it("should get results by card rarity", async () => {
			const results = await cardCollection.getCards({
				cardRarity: collectionCardRarityMock,
			});

			expect(results?.data.length).toEqual(1);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data[0].name).toEqual("Mirror Entity");
		});

		it("should get results by oracleId", async () => {
			const results = await cardCollection.getCards({
				oracleId: [
					"7df3e379-c217-416e-a1c8-46338608c49e",
					"c5bfc1b9-a55d-4608-a6f7-bb62cb8dc3c6",
				],
			});

			expect(results?.data.length).toEqual(2);
			expect(results?.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data[0].name).toEqual("Elvish Promenade");
			expect(results.data[1].name).toEqual("Aegis of the Gods");
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

	describe("getSets", () => {
		it("should get sets from collection", async () => {
			const results = await cardCollection.getSets();

			expect(Array.isArray(results?.data)).toEqual(true);
			expect(results?.data.includes("m14")).toEqual(true);
		});

		it("should return empty and error response when there's no connection", async () => {
			const results = await cardCollectionNoConnection.getSets();
			expect(results).toEqual(noDbConnectionResult);
		});
	});

	describe("getAllVersions", () => {
		it("should get all versions from collection", async () => {
			const results = await cardCollection.getAllVersions();

			expect(results.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data?.length).toBeGreaterThan(0);
		});
	});

	describe("getAllCardsWithVersions", () => {
		it("should get all cards with versions", async () => {
			const results = await cardCollection.getAllCardsWithVersions();

			expect(results.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data?.length).toBeGreaterThan(0);
			expect(results.data[0].versions.length).toBeGreaterThan(0);
		});
	});

	describe("getVersionsCount", () => {
		it("should get version count", async () => {
			const results = await cardCollection.getVersionsCount();

			expect(results.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data).toBeGreaterThan(0);
		});
	});

	describe("updatePrices", () => {
		it("should update prices of card", async () => {
			const randomRegular = Math.floor(Math.random() * 100);
			const randomFoil = Math.floor(Math.random() * 100);

			const results = await cardCollection.updatePrices(
				elvishMysticCollectionVersion.scryfallId,
				{ usd: randomRegular, usd_foil: randomFoil }
			);

			expect(results.status).toEqual(DbModelResponseEnum.SUCCESS);
			expect(results.data.value.prices.regular).toEqual(randomRegular);
			expect(results.data.value.prices.foil).toEqual(randomFoil);
		});

		it("should return error when not able to update price", async () => {
			const randomRegular = Math.floor(Math.random() * 100);
			const randomFoil = Math.floor(Math.random() * 100);

			const results = await cardCollection.updatePrices("fakeScryfallId", {
				usd: randomRegular,
				usd_foil: randomFoil,
			});

			expect(results.status).toEqual(DbModelResponseEnum.ERROR);
		});
	});
});
