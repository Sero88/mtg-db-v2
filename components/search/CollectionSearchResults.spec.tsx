import {
	elvishMysticCollectionCard,
	elvishMysticCollectionCardWithVersions,
} from "@/tests/mocks/collectionCard.mock";
import { CollectionSearchResults } from "./CollectionSearchResults";
import { fireEvent, render, screen } from "@testing-library/react";
import * as CardsListComponent from "@/components/cards/CardList";
import * as CollectionCardComponent from "@/components/cards/CollectionCard";
import * as CollectionCardModal from "@/components/cards/CollectionCardModal";

jest.mock("@/components/cards/CardList", () => {
	const originalModule = jest.requireActual("@/components/cards/CardList");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/cards/CollectionCard", () => {
	const originalModule = jest.requireActual("@/components/cards/CollectionCard");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/cards/CollectionCardModal", () => {
	const originalModule = jest.requireActual("@/components/cards/CollectionCardModal");

	return {
		__esModule: true,
		...originalModule,
	};
});

const cardListSpy = jest.spyOn(CardsListComponent, "CardList");
const collectionCardListSpy = jest.spyOn(CollectionCardComponent, "CollectionCard");
const elvishMysticSearchResults = [elvishMysticCollectionCardWithVersions];
const collectionCardModalSpy = jest.spyOn(CollectionCardModal, "CollectionCardModal");

describe("CollectionSearchResults", () => {
	it("should display no results message when there are no results", () => {
		render(<CollectionSearchResults cardData={[]} />);
		expect(screen.queryByTestId("no-search-match")).not.toBeNull();
	});

	it("should display no results message when there are no results", () => {
		render(<CollectionSearchResults cardData={elvishMysticSearchResults} />);
		expect(screen.queryByRole("heading", { level: 2 })).not.toBeNull();
	});

	it("should display matched card amount", () => {
		render(<CollectionSearchResults cardData={elvishMysticSearchResults} />);
		expect(screen.queryByTestId("search-matched")).not.toBeNull();
	});

	it("should display collection card list", () => {
		render(<CollectionSearchResults cardData={elvishMysticSearchResults} />);
		expect(cardListSpy).toHaveBeenCalled();
		expect(collectionCardListSpy).toHaveBeenCalled();
	});

	it("should display modal when a card is clicked", () => {
		render(<CollectionSearchResults cardData={elvishMysticSearchResults} />);

		const card = screen.getByText(elvishMysticSearchResults[0].name);
		fireEvent.click(card);

		expect(collectionCardModalSpy).toHaveBeenCalledWith(
			{
				card: elvishMysticSearchResults[0],
				showModal: true,
				closeModalCallback: expect.anything(),
			},
			{}
		);
	});
});
