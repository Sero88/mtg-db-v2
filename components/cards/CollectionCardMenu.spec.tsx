import { elvishMystic, nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardMenu } from "./CollectionCardMenu";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as updateHook from "@/hooks/useUpdateCollectionCardQuantity";
import { getSetQuantityResultMock } from "@/tests/mocks/collectionQuantity.mock";
import { elvishMysticCollectionVersion } from "@/tests/mocks/collectionCard.mock";

jest.mock("@/hooks/useUpdateCollectionCardQuantity", () => {
	return {
		__esModule: true,
		...jest.requireActual("@/hooks/useUpdateCollectionCardQuantity"),
	};
});

const updateHookSpy = jest.spyOn(updateHook, "useUpdateCollectionCardQuantity");
const mutateMock = jest.fn();
mutateMock.mockImplementation(() => ({
	data: getSetQuantityResultMock(),
}));

//@ts-ignore
updateHookSpy.mockImplementation(() => ({ mutate: mutateMock }));

const quantity = {
	[CollectionCardQuantityTypeEnum.REGULAR]: 1,
	[CollectionCardQuantityTypeEnum.FOIL]: 2,
};

const quantityFoil = {
	[CollectionCardQuantityTypeEnum.REGULAR]: undefined,
	[CollectionCardQuantityTypeEnum.FOIL]: 1,
};

describe("CollectionCardMenu", () => {
	it("should display logo", () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		expect(screen.queryByAltText("collection logo")).not.toBeNull();
	});

	it("should display passed quantities for both input types", () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		const foilInput = screen.getByTestId("foil-input");

		expect(regularInput).not.toBeNull();
		expect(regularInput).toHaveProperty(
			"value",
			String(quantity[CollectionCardQuantityTypeEnum.REGULAR])
		);

		expect(foilInput).not.toBeNull();
		expect(foilInput).toHaveProperty(
			"value",
			String(quantity[CollectionCardQuantityTypeEnum.FOIL])
		);
	});

	it("should not display regular input if card only has foil version", () => {
		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantity} />);

		expect(screen.queryByTestId("regular-input")).toBeNull();
		expect(screen.queryByTestId("foil-input")).not.toBeNull();
	});

	it("should not display foil input if card only has regular version", () => {
		render(
			<CollectionCardMenu
				cardData={{ ...nissaVastwoodSeer, finishes: ["nonfoil"] }}
				quantity={quantity}
			/>
		);

		expect(screen.queryByTestId("regular-input")).not.toBeNull();
		expect(screen.queryByTestId("foil-input")).toBeNull();
	});

	it("should run update quantity when value changes: foil", async () => {
		const newQuantity = 4;
		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		const foilInput = screen.getByTestId("foil-input");
		fireEvent.change(foilInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(mutateMock).toHaveBeenCalledWith({
				card: nissaVastwoodSeer,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: 0,
					[CollectionCardQuantityTypeEnum.FOIL]: newQuantity,
				},
				type: CollectionCardQuantityTypeEnum.FOIL,
			});
		});

		expect(updateHookSpy).toHaveBeenCalled();
	});

	it("should run update quantity when value changes: regular", async () => {
		const newQuantity = 4;

		mutateMock.mockImplementation(() => ({
			data: getSetQuantityResultMock(elvishMysticCollectionVersion),
		}));

		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		fireEvent.change(regularInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(mutateMock).toHaveBeenCalledWith({
				card: elvishMystic,
				quantity: {
					[CollectionCardQuantityTypeEnum.REGULAR]: newQuantity,
					[CollectionCardQuantityTypeEnum.FOIL]: quantity.foil,
				},
				type: CollectionCardQuantityTypeEnum.REGULAR,
			});
		});

		expect(updateHookSpy).toHaveBeenCalled();
	});
});