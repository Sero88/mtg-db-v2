import { CollectionCard } from "./CollectionCard";
import * as CardImageComponent from "./CardImage";
import { elvishMysticCollectionCardWithVersions } from "@/tests/mocks/collectionCard.mock";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("./CardImage", () => {
	const originalModule = jest.requireActual("./CardImage");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CardImage");
const clickHandlerMock = jest.fn();

describe("CollectionCard component", () => {
	it("should display CardImage component", () => {
		render(
			<CollectionCard
				data={elvishMysticCollectionCardWithVersions}
				clickHandler={clickHandlerMock}
			/>
		);
		expect(cardImageSpy).toHaveBeenCalled();
	});

	it("should display card name", () => {
		render(
			<CollectionCard
				data={elvishMysticCollectionCardWithVersions}
				clickHandler={clickHandlerMock}
			/>
		);
		expect(screen.queryByText(elvishMysticCollectionCardWithVersions.name)).not.toBeNull();
	});

	it("should call clickHandler when image is clicked", () => {
		render(
			<CollectionCard
				data={elvishMysticCollectionCardWithVersions}
				clickHandler={clickHandlerMock}
			/>
		);
		expect(screen.queryByText(elvishMysticCollectionCardWithVersions.name)).not.toBeNull();
		const image = screen.getByRole("img");
		fireEvent.click(image);

		expect(clickHandlerMock).toHaveBeenCalledWith(elvishMysticCollectionCardWithVersions);
	});
});
