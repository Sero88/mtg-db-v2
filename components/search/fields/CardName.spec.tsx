import { SearchFieldNames } from "@/types/search";
import { CardName } from "./CardName";
import { fireEvent, render, screen } from "@testing-library/react";

const fieldData = {
	name: SearchFieldNames.NAME,
	value: "Card Value",
};
const changeHandler = jest.fn();

describe("CardName", () => {
	it("should have label", () => {
		render(<CardName fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByLabelText("Card name")).not.toBeNull();
	});

	it("should display passed value", () => {
		render(<CardName fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByDisplayValue(fieldData.value)).not.toBeNull();
	});

	it("should run changeHandler when value is changed", () => {
		render(<CardName fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		fireEvent.change(input, { target: { value: "new name" } });

		expect(changeHandler).toHaveBeenCalled();
	});

	it("should assign name property", () => {
		render(<CardName fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		expect(input).toHaveProperty("name", fieldData.name);
	});
});
