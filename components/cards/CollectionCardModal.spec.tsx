import { elvishMysticCollectionCardWithVersions } from "@/tests/mocks/collectionCard.mock";
import { CollectionCardModal } from "./CollectionCardModal";
import { fireEvent, render, screen } from "@testing-library/react";

const closeModalMock = jest.fn();
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
});
