import * as CardNameComponent from "@/components/search/fields/CardName";
import * as CardTextComponent from "@/components/search/fields/CardText";
import * as CardTypesComponent from "@/components/search/fields/CardTypes";
import * as CardColorsComponent from "@/components/search/fields/CardColors";
import * as CardStatsComponent from "@/components/search/fields/CardStats";
import * as CardSetsComponent from "@/components/search/fields/CardSets";
import * as CardRarityComponent from "@/components/search/fields/CardRarity";

import { CollectionSearchForm } from "./CollectionSearchForm";
import { fireEvent, render, screen } from "@testing-library/react";

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

jest.mock("@/components/search/fields/CardSets", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardSets");

	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/components/search/fields/CardRarity", () => {
	const originalModule = jest.requireActual("@/components/search/fields/CardRarity");

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
const cardSetsSpy = jest.spyOn(CardSetsComponent, "CardSets");
const cardRaritySpy = jest.spyOn(CardRarityComponent, "CardRarity");

const searchHandlerMock = jest.fn();

describe("CollectionSearchForm", () => {
	it("should display all field components", () => {
		render(<CollectionSearchForm searchHandler={searchHandlerMock} />);
		expect(cardNameSpy).toHaveBeenCalled();
		expect(cardTextSpy).toHaveBeenCalled();
		expect(cardTypesSpy).toHaveBeenCalled();
		expect(cardColorsSpy).toHaveBeenCalled();
		expect(cardStatsSpy).toHaveBeenCalled();
		expect(cardSetsSpy).toHaveBeenCalled();
		expect(cardRaritySpy).toHaveBeenCalled();
	});
});
