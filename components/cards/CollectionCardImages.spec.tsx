import { nissaVastwoodSeerCollectionVersion } from "@/tests/mocks/collectionCard.mock";
import { CollectionCardImages } from "./CollectionCardImages";
import { render } from "@testing-library/react";
import * as CardImageComponent from "./CardImage";
import { CardType } from "@/types/card";

jest.mock("./CardImage", () => {
	const originalModule = jest.requireActual("./CardImage");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CardImage");
describe("CollectionCardImages component", () => {
	const cardName = "Nissa";

	it("should call CardImage with correct attributes", () => {
		render(
			<CollectionCardImages
				version={nissaVastwoodSeerCollectionVersion}
				cardName={cardName}
			/>
		);

		nissaVastwoodSeerCollectionVersion.images.forEach((image, index) => {
			expect(cardImageSpy).toHaveBeenCalledWith(
				{
					imageUri: nissaVastwoodSeerCollectionVersion.images[index].imageUri,
					name: cardName,
					type: CardType.COLLECTION,
				},
				{}
			);
		});
	});
});
