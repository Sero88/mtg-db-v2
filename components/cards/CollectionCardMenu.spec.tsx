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

const quantity = {
	[CollectionCardQuantityTypeEnum.REGULAR]: 1,
	[CollectionCardQuantityTypeEnum.FOIL]: 2,
};

const quantityFoil = {
	[CollectionCardQuantityTypeEnum.REGULAR]: undefined,
	[CollectionCardQuantityTypeEnum.FOIL]: 1,
};

const newQuantity = 4;
const inputs = ["regular-input", "foil-input"];

describe("CollectionCardMenu", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		//@ts-ignore
		updateHookSpy.mockImplementation(() => ({
			mutate: mutateMock,
			mutateAsync: mutateMock,
			isLoading: false,
			isError: false,
		}));
	});
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
		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		const foilInput = screen.getByTestId("foil-input");
		fireEvent.change(foilInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(mutateMock).toHaveBeenCalledWith({
				card: nissaVastwoodSeer,
				newQuantity,
				type: CollectionCardQuantityTypeEnum.FOIL,
			});
		});

		expect(updateHookSpy).toHaveBeenCalled();
	});

	it("should run update quantity when value changes: regular", async () => {
		mutateMock.mockImplementation(() => ({
			data: getSetQuantityResultMock(elvishMysticCollectionVersion),
		}));

		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		fireEvent.change(regularInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(mutateMock).toHaveBeenCalledWith({
				card: elvishMystic,
				newQuantity,
				type: CollectionCardQuantityTypeEnum.REGULAR,
			});
		});

		expect(updateHookSpy).toHaveBeenCalled();
	});

	it("should show loader when updating quantity", () => {
		//@ts-ignore
		updateHookSpy.mockImplementation(() => ({
			mutate: mutateMock,
			isLoading: true,
			isError: false,
		}));

		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		expect(screen.queryByTestId("loader")).not.toBeNull();
	});

	it("should not show loader when update hook is not loading", () => {
		//@ts-ignore
		updateHookSpy.mockImplementation(() => ({
			mutate: mutateMock,
			isLoading: false,
			isError: false,
		}));

		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		expect(screen.queryByTestId("loader")).toBeNull();
	});

	it("should show error when update fails", async () => {
		const resolveNullMock = jest.fn().mockResolvedValue(null);

		//@ts-ignore
		updateHookSpy.mockImplementation(() => ({
			mutate: mutateMock,
			mutateAsync: resolveNullMock,
			isLoading: false,
			isError: true,
		}));

		mutateMock.mockResolvedValueOnce(null);

		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		const foilInput = screen.getByTestId("foil-input");
		fireEvent.change(foilInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(screen.queryByTestId("updateError")).not.toBeNull();
		});
	});

	it("should show success message when update is successful", async () => {
		//@ts-ignore
		updateHookSpy.mockImplementation(() => ({
			mutate: mutateMock,
			mutateAsync: jest.fn().mockResolvedValue(getSetQuantityResultMock()),
			isLoading: false,
			isError: false,
			isSuccess: true,
		}));

		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantityFoil} />);

		const foilInput = screen.getByTestId("foil-input");
		fireEvent.change(foilInput, { target: { value: newQuantity } });

		await waitFor(() => {
			expect(screen.queryByTestId("updateSuccess")).not.toBeNull();
		});
	});

	it("should set field to empty string input is not a number ", async () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		fireEvent.change(regularInput, { target: { value: "test" } });

		await waitFor(() => {
			const input = screen.getByTestId("regular-input") as HTMLInputElement;
			expect(input.value).toEqual("");
		});
	});

	it("should not run update when input is not a number ", async () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		fireEvent.change(regularInput, { target: { value: "test" } });

		await waitFor(() => {
			const input = screen.getByTestId("regular-input") as HTMLInputElement;
			expect(input.value).toEqual("");
		});

		expect(mutateMock).not.toHaveBeenCalled();
	});

	test.each(inputs)("%p should select text when user clicks on it", (inputType) => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);
		const input = screen.getByTestId(inputType);
		const mockSelect = jest.fn();
		input.onselect = mockSelect;
		fireEvent.click(input);

		expect(mockSelect).toHaveBeenCalled();
	});
});
