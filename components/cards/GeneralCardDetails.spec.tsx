import { render, screen, fireEvent } from "@testing-library/react";
import { GeneralCardDetails } from "./GeneralCardDetails";
import { generalSearchMock } from "@/tests/mocks/cardSearch.mock";

const elvishMysticCardData = generalSearchMock.data[0];
describe("GeneralCardDetails component", () => {
	it("should display card name", () => {
		render(<GeneralCardDetails card={elvishMysticCardData} clickHandler={jest.fn()} />);
		expect(screen.queryByText(elvishMysticCardData.name)).not.toBeNull();
	});

	it("clicking on card name should trigger handler", () => {
		const clickHandler = jest.fn();
		render(<GeneralCardDetails card={elvishMysticCardData} clickHandler={clickHandler} />);
		const cardName = screen.getByText(elvishMysticCardData.name);
		fireEvent.click(cardName);

		expect(clickHandler).toHaveBeenCalledWith(elvishMysticCardData.name);
	});
});
