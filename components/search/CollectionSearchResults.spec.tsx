import { elvishMysticCollectionCard } from "@/tests/mocks/collectionCard.mock";
import { CollectionSearchResults } from "./CollectionSearchResults";
import { render, screen } from "@testing-library/react";
import * as CollectionCardListComponent from "../cards/CollectionCardList";

jest.mock("@/components/cards/CollectionCardList", () => {
	const originalModule = jest.requireActual("@/components/cards/CollectionCardList");

	return {
		__esModule: true,
		...originalModule,
	};
});

const collectionCardListSpy = jest.spyOn(CollectionCardListComponent, "CollectionCardList");
const elvishMysticSearchResults = [elvishMysticCollectionCard];

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
		expect(collectionCardListSpy).toHaveBeenCalled();
	});
});
