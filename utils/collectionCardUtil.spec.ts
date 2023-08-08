import { elvishMystic, nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardUtil } from "./collectionCardUtil";
import { cardsWithRegularAndFoilQuantities } from "@/tests/mocks/collectionQuantity.mock";
import {
	elvishMysticCollectionCard,
	nissaVastwoodSeerCollectionCard,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { ScryfallCardFace } from "@/types/scryfall";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";

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
			const cardVersion = CollectionCardUtil.buildVersionObject(
				nissaVastwoodSeer,
				{
					[CollectionCardQuantityTypeEnum.FOIL]: 1,
				},
				CollectionCardQuantityTypeEnum.FOIL
			);

			expect(cardVersion).toEqual(expectedVersionObject);
		});
	});
});
