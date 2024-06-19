import { SearchFieldNames } from "@/types/search";
import { CardRarity } from "./CardRarity";
import { fireEvent, render, screen } from "@testing-library/react";
import { CardRarityEnum } from "@/types/card";
const fieldData = {
	name: SearchFieldNames.RARITY,
	value: [] as string[],
};

const changeHandler = jest.fn();

const renderComponent = () => {
	render(<CardRarity changeHandler={changeHandler} fieldData={fieldData} />);
};

describe("CardRarity", () => {
	it("should display all rarity types", () => {
		renderComponent();

		const checkboxes = screen.queryAllByRole("checkbox");
		expect(checkboxes.length).toEqual(Object.keys(CardRarityEnum).length / 2);
	});

	it("should run changeHandler when checkbox is clicked", () => {
		renderComponent();

		const checkboxes = screen.queryAllByRole("checkbox");
		fireEvent.click(checkboxes[0]);

		expect(changeHandler).toHaveBeenCalledWith([0]);
	});

	it("should remove item when unchecked", () => {
		renderComponent();

		const checkboxes = screen.queryAllByRole("checkbox");
		fireEvent.click(checkboxes[0]);

		expect(changeHandler).toHaveBeenCalledWith([0]);

		fireEvent.click(checkboxes[0]);
		expect(changeHandler).toHaveBeenLastCalledWith([]);
	});
});
