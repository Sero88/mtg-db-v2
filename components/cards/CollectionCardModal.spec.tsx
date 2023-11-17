import {
	elvishMysticCollectionCardWithVersions,
	nissaVastwoodSeerCollectionCard,
	nissaVastwoodSeerCollectionVersion,
} from "@/tests/mocks/collectionCard.mock";
import { CollectionCardModal } from "./CollectionCardModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as CardImageComponent from "./CollectionCardImages";
import * as CollectionVersionsListComponent from "./CollectionCardVersionsList";

const closeModalMock = jest.fn();

jest.mock("./CollectionCardImages", () => {
	const originalModule = jest.requireActual("./CollectionCardImages");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("./CollectionCardVersionsList", () => {
	const originalModule = jest.requireActual("./CollectionCardVersionsList");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CollectionCardImages");
const cardVersionList = jest.spyOn(CollectionVersionsListComponent, "CollectionCardVersionsList");

describe("CollectionCardModal component", () => {
	beforeEach(() => {
		closeModalMock.mockClear();
	});
	it("should not display modal if showModal is false", () => {
		const { container } = render(
			<CollectionCardModal
				showModal={false}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);

		expect(container.innerHTML).toEqual("");
	});
	it("should display card name as header", () => {
		render(
			<CollectionCardModal
				showModal={true}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);

		const header = screen.getByRole("heading", { level: 1 });
		expect(header?.innerHTML).toEqual(elvishMysticCollectionCardWithVersions.name);
	});

	it("should close modal when clicking in the modal container area, outside content", () => {
		render(
			<CollectionCardModal
				showModal={true}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);

		const container = screen.getByTestId("modalContainer");
		fireEvent.click(container);

		expect(closeModalMock).toHaveBeenCalled();
	});

	it("should not close modal when clicking in the modal content area", () => {
		render(
			<CollectionCardModal
				showModal={true}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);

		const header = screen.getByRole("heading", { level: 1 });
		fireEvent.click(header);

		expect(closeModalMock).not.toHaveBeenCalled();
	});

	it("should close modal when clicking in close icon", () => {
		render(
			<CollectionCardModal
				showModal={true}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);

		const closeIcon = screen.getByTestId("closeIcon");
		fireEvent.click(closeIcon);

		expect(closeModalMock).toHaveBeenCalled();
	});

	it("should display images", () => {
		const nissaCard = {
			...nissaVastwoodSeerCollectionCard,
			versions: [nissaVastwoodSeerCollectionVersion],
		};
		render(
			<CollectionCardModal
				showModal={true}
				card={nissaCard}
				closeModalCallback={closeModalMock}
			/>
		);

		expect(cardImageSpy).toHaveBeenCalledWith(
			{
				version: nissaVastwoodSeerCollectionVersion,
				cardName: nissaVastwoodSeerCollectionCard.name,
			},
			{}
		);
	});

	it("should display list of versions", () => {
		const nissaCard = {
			...nissaVastwoodSeerCollectionCard,
			versions: [nissaVastwoodSeerCollectionVersion],
		};
		render(
			<CollectionCardModal
				showModal={true}
				card={nissaCard}
				closeModalCallback={closeModalMock}
			/>
		);
		expect(cardVersionList).toHaveBeenCalledWith(
			{
				versions: [nissaVastwoodSeerCollectionVersion],
				selectionHandler: expect.anything(),
				selectedVersion: nissaVastwoodSeerCollectionVersion,
			},
			{}
		);
	});

	it("should set selected version when a version item is clicked", async () => {
		render(
			<CollectionCardModal
				showModal={true}
				card={elvishMysticCollectionCardWithVersions}
				closeModalCallback={closeModalMock}
			/>
		);
		const versionRows = screen.getAllByRole("row");

		fireEvent.click(versionRows[1]);

		expect(cardImageSpy).toHaveBeenCalledWith(
			{
				version: elvishMysticCollectionCardWithVersions.versions[1],
				cardName: elvishMysticCollectionCardWithVersions.name,
			},
			{}
		);
	});
});
