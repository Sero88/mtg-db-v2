import { SearchFields } from "@/types/search";
import { CardText } from "./CardText";
import { fireEvent, render, screen } from "@testing-library/react";

const fieldData = {
	name: SearchFields.TEXT,
	value: "Card Value",
};
const changeHandler = jest.fn();

describe("CardText", () => {
	it("should have label", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByLabelText("Text")).not.toBeNull();
	});

	it("should display passed value", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.queryByDisplayValue(fieldData.value)).not.toBeNull();
	});

	it("should run changeHandler when value is changed", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		fireEvent.change(input, { target: { value: "new name" } });

		expect(changeHandler).toHaveBeenCalled();
	});

	it("should assign name property", () => {
		render(<CardText fieldData={fieldData} changeHandler={changeHandler} />);
		const input = screen.getByDisplayValue(fieldData.value);

		expect(input).toHaveProperty("name", fieldData.name);
	});
});
