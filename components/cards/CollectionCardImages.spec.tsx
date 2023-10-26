import {
	nissaVastwoodSeerCollectionCard,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { CollectionCardImages } from "./CollectionCardImages";
import { render } from "@testing-library/react";
import * as CardImageComponent from "./CardImage";

jest.mock("./CardImage", () => {
	const originalModule = jest.requireActual("./CardImage");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CardImage");
describe("CollectionCardImages component", () => {
	it("should display images", () => {
		render(
			<CollectionCardImages
				card={{
					...nissaVastwoodSeerCollectionCard,
					versions: [nissaVastwoodSeerCollectionVersion],
				}}
			/>
		);

		expect(cardImageSpy.mock?.calls?.length).toBeGreaterThanOrEqual(
			nissaVastwoodSeerCollectionVersion.images.length
		);
	});
});
