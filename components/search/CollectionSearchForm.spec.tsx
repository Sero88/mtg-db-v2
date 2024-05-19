import * as CardNameComponent from "@/components/search/fields/CardName";
import * as CardTextComponent from "@/components/search/fields/CardText";
import * as CardTypesComponent from "@/components/search/fields/CardTypes";
import * as CardColorsComponent from "@/components/search/fields/CardColors";
import * as CardStatsComponent from "@/components/search/fields/CardStats";
import { CollectionSearchForm } from "./CollectionSearchForm";
import { render } from "@testing-library/react";

jest.mock("@/components/search/fields/CardName", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardName");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardText", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardText");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardTypes", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardTypes");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardColors", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardColors");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardStats", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardStats");

	return {
		__esModule: true,
		...originalModule,
	};
});

const cardNameSpy = jest.spyOn(CardNameComponent, "CardName");
const cardTextSpy = jest.spyOn(CardTextComponent, "CardText");
const cardTypesSpy = jest.spyOn(CardTypesComponent, "CardTypes");
const cardColorsSpy = jest.spyOn(CardColorsComponent, "CardColors");
const cardStatsSpy = jest.spyOn(CardStatsComponent, "CardStats");
const searchHandlerMock = jest.fn();

describe("CollectionSearchForm", () => {
	it("should display CardName component", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardNameSpy).toHaveBeenCalled();
	});

	it("should display CardText component", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardTextSpy).toHaveBeenCalled();
	});

	it("should display CardTypes component", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardTypesSpy).toHaveBeenCalled();
	});

	it("should display CardColors component", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardColorsSpy).toHaveBeenCalled();
	});

	it("should display CardStats component", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardStatsSpy).toHaveBeenCalled();
	});

	// TODO: once I add more fields, I should prove that updating one field, shouldn't reset another
});
