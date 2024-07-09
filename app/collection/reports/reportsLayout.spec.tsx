/**
 * @jest-environment node
 */
import ReportsLayout from "./layout";
import { CollectionVersionsDataProvider } from "@/providers/CollectionVerionsProvider";
import { Version } from "@/types/collection";
import * as CollectionVersionsFetch from "@/utils/dataFetch/collectionVersions";
import { collectionVersionsMock } from "@/tests/mocks/collectionVersions.mock";
import { DataError } from "@/components/utils/DataError";

jest.mock("@/utils/dataFetch/collectionVersions", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/collectionVersions");
	return {
		__esModule: true,
		...originalModule,
	};
});

const getCollectionVersionsDataSpy = jest.spyOn(CollectionVersionsFetch, "getCollectionVersions");

describe("Reports Layout", () => {
	beforeEach(() => {
		getCollectionVersionsDataSpy.mockResolvedValue({
			data: collectionVersionsMock,
			success: true,
		});
	});
	it("should get collection versions data", async () => {
		await ReportsLayout({ children: <p>test</p> });

		expect(getCollectionVersionsDataSpy).toHaveBeenCalled();
	});

	it("should return collection versions with children object", async () => {
		const jsxElement = await ReportsLayout({ children: <p>test</p> });

		expect(jsxElement).toEqual(
			<CollectionVersionsDataProvider versions={collectionVersionsMock as Version[]}>
				{<p>test</p>}
			</CollectionVersionsDataProvider>
		);
	});

	it("should return error when data is not fetched", async () => {
		getCollectionVersionsDataSpy.mockResolvedValue({
			data: null,
			success: false,
		});
		const jsxElement = await ReportsLayout({ children: <p>test</p> });

		expect(jsxElement).toEqual(<DataError />);
	});
});
