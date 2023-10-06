import { render, screen } from "@testing-library/react";
import { CardList } from "./CardList";
import { elvishMysticCollectionCard } from "@/tests/mocks/collectionCard.mock";
import { CollectionCard } from "@/types/collection";
const elvishMysticSearchResults = [elvishMysticCollectionCard];

const renderCardMock = jest.fn((elvishMysticCollectionCard) => (
	<p>{elvishMysticCollectionCard?.name}</p>
));
describe("CardList component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should display card list", () => {
		render(<CardList cardData={elvishMysticSearchResults} renderCard={renderCardMock} />);
		const list = screen.queryByRole("list");

		expect(list).not.toBeNull();
	});

	it("should run renderCard callback", () => {
		render(<CardList cardData={elvishMysticSearchResults} renderCard={renderCardMock} />);

		expect(renderCardMock).toHaveBeenCalled();
	});
});
