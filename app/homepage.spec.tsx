import { DailyFlavorText } from "@/components/collection/DailyFlavorText";
import Homepage from "./page";
import { render } from "@testing-library/react";
import { CollectionOption } from "@/components/utils/CollectionOption";

jest.mock("@/components/collection/DailyFlavorText");
const dailyFlavorTextMock = jest.mocked(DailyFlavorText);

jest.mock("@/components/utils/CollectionOption");
const collectionOptionMock = jest.mocked(CollectionOption);

dailyFlavorTextMock.mockReturnValue(<></>);

describe("Homepage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should display DailyFlavorText", () => {
		render(<Homepage />);
		expect(dailyFlavorTextMock).toHaveBeenCalled();
	});

	it("should display collection options", () => {
		render(<Homepage />);
		expect(collectionOptionMock).toHaveBeenCalledTimes(2);
	});
});
