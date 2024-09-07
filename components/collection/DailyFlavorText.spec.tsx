import * as QueryResultComponent from "@/components/utils/QueryResult";
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { UseQueryResult } from "react-query";
import DailyFlavorText from "./DailyFlavorText";
import { render, screen } from "@testing-library/react";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { elvishMysticCollectionCard } from "@/tests/mocks/collectionCard.mock";

jest.mock("@/components/utils/QueryResult", () => {
	const originalModule = jest.requireActual("@/components/utils/QueryResult");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/hooks/useGetCollectionData");
const useGetCollectionDataMock = jest.mocked(useGetCollectionData);

const queryResultSpy = jest.spyOn(QueryResultComponent, "QueryResult");

describe("DailyFlavorText", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useGetCollectionDataMock.mockReturnValue({
			isLoading: false,
			error: false,
			data: elvishMysticCollectionCard,
			isSuccess: true,
		} as unknown as UseQueryResult);
	});

	it("should display quote icons", () => {
		const { baseElement } = render(<DailyFlavorText />);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faQuoteLeft.iconName}"`);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faQuoteRight.iconName}"`);
	});

	it("should display flavor text of card retrieved", () => {
		render(<DailyFlavorText />);
		expect(screen.queryByText("Life grows everywhere.", { exact: false })).not.toBeNull();
	});

	it("should display card name of flavor text", () => {
		render(<DailyFlavorText />);
		expect(
			screen.queryByText(elvishMysticCollectionCard.name, { exact: false })
		).not.toBeNull();
	});

	it("should use QueryResult component", () => {
		render(<DailyFlavorText />);
		expect(queryResultSpy).toHaveBeenCalled();
	});
});
