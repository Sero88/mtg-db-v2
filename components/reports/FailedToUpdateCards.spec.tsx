import {
	cardsOfFailedToUpdateVersionsMock,
	failedToUpdateVersionsMock,
} from "@/tests/mocks/failedToUpdateVersions.mock";
import { FailedToUpdateCards } from "./FailedToUpdateCards";
import { render, screen } from "@testing-library/react";
import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { useGetSets } from "@/hooks/useGetSets";
import { UseQueryResult } from "react-query";
import { scryfallSetsMock } from "@/tests/mocks/scryfallSets.mock";

jest.mock("@/hooks/useCollectionCardSearch");
const useCollectionCardSearchMock = jest.mocked(useCollectionCardSearch);
useCollectionCardSearchMock.mockReturnValue({
	isLoading: false,
	error: false,
	data: cardsOfFailedToUpdateVersionsMock,
	isSuccess: false,
} as unknown as UseQueryResult);

jest.mock("@/hooks/useGetSets");
const useGetSetsMock = jest.mocked(useGetSets);
useGetSetsMock.mockReturnValue({
	isLoading: false,
	error: false,
	data: scryfallSetsMock,
	isSuccess: false,
} as unknown as UseQueryResult);

describe("FailedToUpdateCards", () => {
	it("should show list of all failed versions", () => {
		render(<FailedToUpdateCards failedToUpdateVersions={failedToUpdateVersionsMock} />);
		const listItems = screen.getAllByRole("listitem");
		expect(listItems.length).toEqual(failedToUpdateVersionsMock.length);
	});

	it("should show card data for each version", () => {
		render(<FailedToUpdateCards failedToUpdateVersions={failedToUpdateVersionsMock} />);

		failedToUpdateVersionsMock.forEach((version, index) => {
			expect(
				screen.queryByText(cardsOfFailedToUpdateVersionsMock[index].name)
			).not.toBeNull();
			expect(
				screen.queryByText(
					`${version.set.toLocaleUpperCase()} #${version.collectionNumber}`,
					{ exact: false }
				)
			).not.toBeNull();
		});
	});

	it("should show set name", () => {
		render(<FailedToUpdateCards failedToUpdateVersions={failedToUpdateVersionsMock} />);

		scryfallSetsMock.forEach((set) => {
			expect(screen.queryByText(set.name, { exact: false })).not.toBeNull();
		});
	});
});
