import { PrintCard } from "./PrintCard";
import * as CardImageComponent from "./CardImage";
import { render } from "@testing-library/react";
import { generalSearchMock } from "@/tests/mocks/cardSearch.mock";
import * as PrintCardDetailsComponent from "./PrintCardDetails";
import * as CollectionCardMenuComponent from "./CollectionCardMenu";
import { collectionQuantityMock } from "@/tests/mocks/collectionQuantity.mock";
import { nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CardType } from "@/types/card";

jest.mock("@/hooks/useUpdateCollectionCardQuantity");

jest.mock("./CardImage", () => {
	const originalModule = jest.requireActual("./CardImage");
	return {
		__esModule: true,
		...originalModule,
	};
});
jest.mock("./PrintCardDetails", () => {
	const originalModule = jest.requireActual("./PrintCardDetails");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("./CollectionCardMenu", () => {
	const originalModule = jest.requireActual("./CollectionCardMenu");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CardImage");
const printCardDetailsSpy = jest.spyOn(PrintCardDetailsComponent, "PrintCardDetails");
const collectionMenuSpy = jest.spyOn(CollectionCardMenuComponent, "CollectionCardMenu");

describe("PrintCard component", () => {
	it("should display CardImage component", () => {
		render(
			<PrintCard
				data={generalSearchMock.data[0]}
				collectionQuantity={collectionQuantityMock}
			/>
		);
		expect(cardImageSpy).toHaveBeenCalled();
	});

	it("should display CardImage using cardface", () => {
		render(<PrintCard data={nissaVastwoodSeer} collectionQuantity={collectionQuantityMock} />);
		expect(cardImageSpy).toHaveBeenCalledWith(
			{
				imageUri: nissaVastwoodSeer.card_faces?.[0]?.image_uris.normal,
				name: nissaVastwoodSeer.name,
				type: CardType.SCRYFALL_PRINT,
			},
			{}
		);
	});

	it("should display PrintCardDetails", () => {
		render(
			<PrintCard
				data={generalSearchMock.data[0]}
				collectionQuantity={collectionQuantityMock}
			/>
		);
		expect(printCardDetailsSpy).toHaveBeenCalled();
	});

	it("should display CollectionCardMenu", () => {
		render(
			<PrintCard
				data={generalSearchMock.data[0]}
				collectionQuantity={collectionQuantityMock}
			/>
		);
		expect(collectionMenuSpy).toHaveBeenCalled();
	});
});
