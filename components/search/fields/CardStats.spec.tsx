import { CardStatType, SearchFieldNames } from "@/types/search";
import { CardStats } from "./CardStats";
import { fireEvent, render, screen, within } from "@testing-library/react";
import * as StatConditions from "@/components/search/fields/StatConditions";

const fieldData = {
	name: SearchFieldNames.STATS,
	value: [] as CardStatType[],
};

const changeHandler = jest.fn();

jest.mock("@/components/search/fields/StatConditions", () => {
	const originalModule = jest.requireActual("@/components/search/fields/StatConditions");

	return {
		__esModule: true,
		...originalModule,
	};
});

const statConditionsSpy = jest.spyOn(StatConditions, "StatConditions");

describe("CardStats", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display all four card stats", () => {
		render(<CardStats fieldData={fieldData} changeHandler={changeHandler} />);
		expect(screen.getAllByRole("group").length).toEqual(4);
	});

	it("should display stat conditions", () => {
		render(<CardStats fieldData={fieldData} changeHandler={changeHandler} />);
		expect(statConditionsSpy).toHaveBeenCalledTimes(4);
	});

	it("should not allow value of stat to be over 99", () => {
		render(<CardStats fieldData={fieldData} changeHandler={changeHandler} />);
		const statValue = screen.getAllByRole("spinbutton")[0] as HTMLInputElement;

		fireEvent.change(statValue, { target: { value: "100" } });

		expect(statValue.value).toEqual("");
	});

	it("should allow value 99 or below", () => {
		render(<CardStats fieldData={fieldData} changeHandler={changeHandler} />);
		const statValue = screen.getAllByRole("spinbutton")[0] as HTMLInputElement;

		fireEvent.change(statValue, { target: { value: "99" } });

		expect(statValue.value).toEqual("99");
	});

	it("should call changeHandler after updating one of the stats", () => {
		render(<CardStats fieldData={fieldData} changeHandler={changeHandler} />);
		const statValue = screen.getAllByRole("spinbutton")[0] as HTMLInputElement;

		fireEvent.change(statValue, { target: { value: "99" } });

		expect(changeHandler).toHaveBeenCalledWith([
			{ conditional: 0, name: "manaValue", value: "99" },
		]);
	});
});
