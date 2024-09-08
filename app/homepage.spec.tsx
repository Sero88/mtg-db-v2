import { DailyFlavorText } from "@/components/collection/DailyFlavorText";
import Homepage from "./page";
import { render } from "@testing-library/react";

jest.mock("@/components/collection/DailyFlavorText");
const dailyFlavorTextMock = jest.mocked(DailyFlavorText);

dailyFlavorTextMock.mockReturnValue(<></>);

describe("Homepage", () => {
	it("should display DailyFlavorText", () => {
		render(<Homepage />);
		expect(dailyFlavorTextMock).toHaveBeenCalled();
	});
});
