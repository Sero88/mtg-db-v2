import { elvishMystic, nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardUtil } from "./collectionCardUtil";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import {
	elvishMysticCollectionCard,
	elvishMysticCollectionVersion,
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCard,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { ScryfallCardFace } from "@/types/scryfall";
import { CardCollectionVersion, CollectionCardQuantityTypeEnum } from "@/types/collection";

describe("CollectionCardUtil", () => {
	describe("mapIdWithQuantities", () => {
		it("should return map scryfallId => quantity", () => {
			const mappedQuantities = CollectionCardUtil.mapIdWithQuantities(
				cardsWithRegularAndFoilQuantities
			);

			expect(mappedQuantities.size).toEqual(cardsWithRegularAndFoilQuantities.length);
			expect(mappedQuantities.get(cardsWithRegularAndFoilQuantities[0].scryfallId)).toEqual(
				expect.objectContaining(cardsWithRegularAndFoilQuantities[0].quantity)
			);
		});
	});

	describe("convertManaCost", () => {
		it("should return converted mana cost string as a number", () => {
			const convertedManaCost = CollectionCardUtil.convertManaCost("{2}{G}");

			expect(convertedManaCost).toEqual(3);
		});

		it("should return null when mana cost is empty string", () => {
			const convertedManaCost = CollectionCardUtil.convertManaCost("");

			expect(convertedManaCost).toEqual(null);
		});
	});

	describe("assignCardFaceValues", () => {
		it("should return individual card face values", () => {
			const expectedCardFaceValue = nissaVastwoodSeerCollectionCard.cardFaces[0];

			const expectedBackCardFaceValue = nissaVastwoodSeerCollectionCard.cardFaces[1];
			const cardFace = CollectionCardUtil.assignCardFaceValues(
				nissaVastwoodSeer?.card_faces?.[0]!!
			);

			const cardFace2 = CollectionCardUtil.assignCardFaceValues(
				nissaVastwoodSeer?.card_faces?.[1]!!
			);

			expect(cardFace).toEqual(expectedCardFaceValue);
			expect(cardFace2).toEqual(expectedBackCardFaceValue);
		});
	});

	describe("assignFaceImageValues", () => {
		const faces = [
			[
				nissaVastwoodSeer.card_faces?.[0],
				{
					artist: nissaVastwoodSeer?.artist,
					imageUri: nissaVastwoodSeer?.card_faces?.[0].image_uris.normal,
				},
				0,
			],
			[
				nissaVastwoodSeer.card_faces?.[1],
				{
					artist: nissaVastwoodSeer?.card_faces?.[1].artist,
					imageUri: nissaVastwoodSeer?.card_faces?.[1].image_uris.normal,
				},
				1,
			],
		];
		test.each(faces)("has image values", (cardFace, expectValues, index) => {
			expect(
				CollectionCardUtil.assignFaceImageValues(
					index as number,
					nissaVastwoodSeer,
					cardFace as ScryfallCardFace
				)
			).toEqual(expectValues);
		});
	});
	describe("buildCardQueryObject", () => {
		it("should build query card object", () => {
			const result = CollectionCardUtil.buildCardQueryObject(elvishMystic);

			expect(result).toEqual(elvishMysticCollectionCard);
		});

		it("should return multiple card faces when it applies", () => {
			const result = CollectionCardUtil.buildCardQueryObject(nissaVastwoodSeer);

			expect(result).toEqual(nissaVastwoodSeerCollectionCard);
			expect(result.cardFaces.length).toEqual(nissaVastwoodSeer?.card_faces?.length);
		});
	});

	describe("buildVersionObject", () => {
		it("should build a collection version object", () => {
			const expectedVersionObject = {
				...nissaVastwoodSeerCollectionVersion,
				quantity: undefined,
				"quantity.foil": 1,
			};
			delete expectedVersionObject.quantity;
			const cardVersion = CollectionCardUtil.buildVersionQueryObject(
				nissaVastwoodSeer,
				1,
				CollectionCardQuantityTypeEnum.FOIL
			);

			expect(cardVersion).toEqual(expectedVersionObject);
		});
	});

	describe("versionIsCurrentlyUsed", () => {
		it("should return true when one of the quantities is greater than zero expect the one passed", () => {
			expect(
				CollectionCardUtil.versionIsCurrentlyUsed(
					elvishMysticCollectionVersion,
					CollectionCardQuantityTypeEnum.FOIL
				)
			).toEqual(true);
		});

		it("should return false when there are no quantities greater than zero aside from the one passed", () => {
			expect(
				CollectionCardUtil.versionIsCurrentlyUsed(
					elvishMysticCollectionVersion,
					CollectionCardQuantityTypeEnum.REGULAR
				)
			).toEqual(false);
		});
	});

	describe("getUniqueWords", () => {
		it("should remove stop words", () => {
			const uniqueWords = CollectionCardUtil.getUniqueWords("In the middle of the door");
			const expectedString = "middle door";
			const expecteduniqueWords = ["middle", "door"];

			expect(uniqueWords).toEqual({
				words: expecteduniqueWords,
				text: expectedString,
			});
		});

		it("should remove repeated words", () => {
			const uniqueWords = CollectionCardUtil.getUniqueWords("Eye for an eye");
			const expectedString = "eye for";
			const expecteduniqueWords = ["eye", "for"];

			expect(uniqueWords).toEqual({
				words: expecteduniqueWords,
				text: expectedString,
			});
		});
	});

	describe("constructTextQuery", () => {
		it("should return query regex", () => {
			const textQuery = CollectionCardUtil.constructTextQuery("Door to nothingness");
			const expectedRegex = new RegExp(`Door\\ to\\ nothingness`, "i");
			expect(textQuery).toEqual(expectedRegex);
		});

		it("should escape non-alphanumeric chars", () => {
			const textQuery = CollectionCardUtil.constructTextQuery("+2 Mace");
			const expectedRegex = new RegExp(`\\+2\\ Mace`, "i");
			expect(textQuery).toEqual(expectedRegex);
		});
	});

	describe("getVersionsByType", () => {
		it("should only return versions from card that match type", () => {
			const versions = CollectionCardUtil.getVersionsByType(
				elvishMysticCollectionCardWithVersions,
				CardCollectionVersion.NO_PROMO
			);

			versions.forEach((version) => {
				expect(version.isPromo).toEqual(false);
			});
		});
	});

	describe("getVersionCardImages", () => {
		it("should return correct images", () => {
			const images = CollectionCardUtil.getVersionCardImages(
				nissaVastwoodSeerCollectionVersion
			);
			expect(images).toEqual([
				nissaVastwoodSeerCollectionVersion.images[0].imageUri,
				nissaVastwoodSeerCollectionVersion.images[1].imageUri,
			]);
		});
		it("should return correct amount of images", () => {
			const images = CollectionCardUtil.getVersionCardImages(
				nissaVastwoodSeerCollectionVersion
			);
			expect(images.length).toEqual(nissaVastwoodSeerCollectionVersion.images.length);
		});
	});

	describe("getDefaultSearchCardImage", () => {
		it("should return no promo version images if available", () => {
			const images = CollectionCardUtil.getDefaultSearchCardImages(
				elvishMysticCollectionCardWithVersions
			);
			expect(images).toEqual(expect.arrayContaining(["http:localhost:3000/no-promo"]));
		});

		it("should return promo image when no-promo is not available", () => {
			const images = CollectionCardUtil.getDefaultSearchCardImages({
				...elvishMysticCollectionCardWithVersions,
				versions: [elvishMysticCollectionCardWithVersions.versions[0]],
			});
			expect(images).toEqual(expect.arrayContaining(["http:localhost:3000/promo"]));
		});
	});

	describe("getDefaultSearchVersion", () => {
		it("should return no promo version if avaialable", () => {
			const version = CollectionCardUtil.getDefaultSearchVersion(
				elvishMysticCollectionCardWithVersions
			);
			expect(version).toEqual(elvishMysticCollectionCardWithVersions.versions[1]);
		});

		it("should return promo version if no promo is unavailable", () => {
			const version = CollectionCardUtil.getDefaultSearchVersion({
				...elvishMysticCollectionCardWithVersions,
				versions: [elvishMysticCollectionCardWithVersions.versions[0]],
			});
			expect(version).toEqual(elvishMysticCollectionCardWithVersions.versions[0]);
		});
	});
});
