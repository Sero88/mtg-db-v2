import { PrintCard } from "./PrintCard";
import * as CardImageComponent from "./CardImage";
import { render } from "@testing-library/react";
import { generalSearchMock } from "@/tests/mocks/cardSearch.mock";
import * as PrintCardDetailsComponent from "./PrintCardDetails";

jest.mock("./CardImage", () => {
	const originalModule = jest.requireActual("./CardImage");
	return {
		__esModule: true,
		...originalModule,
	};
});
jest.mock("./PrintCardDetails", () => {
	const originalModule = jest.requireActual("./PrintCardDetails");
	return {
		__esModule: true,
		...originalModule,
	};
});

const cardImageSpy = jest.spyOn(CardImageComponent, "CardImage");
const PrintCardDetailsSpy = jest.spyOn(PrintCardDetailsComponent, "PrintCardDetails");

describe("PrintCard component", () => {
	it("should display CardImage component", () => {
		render(<PrintCard data={generalSearchMock.data[0]} />);
		expect(cardImageSpy).toHaveBeenCalled();
	});

	it("should display PrintCardDetails", () => {
		render(<PrintCard data={generalSearchMock.data[0]} />);
		expect(PrintCardDetailsSpy).toHaveBeenCalled();
	});
});
