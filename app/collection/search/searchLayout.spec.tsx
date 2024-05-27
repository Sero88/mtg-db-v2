/**
 * @jest-environment node
 */
import { setsList } from "@/tests/mocks/setsList.mock";
import SearchLayout from "./layout";
import * as scryfallFetch from "@/utils/dataFetch/scryfallSets";
import * as symbolsFetch from "@/utils/dataFetch/scryfallSymbols";
import * as typesFetch from "@/utils/dataFetch/collectionTypes";
import * as setsFetch from "@/utils/dataFetch/collectionSets";
import { symbolsList } from "@/tests/mocks/symbolList.mock";
// import * as dataErrorComponent from "@/components/utils/DataError";
import { DataError } from "@/components/utils/DataError";
import { ScryfallSymbolDataProvider } from "@/providers/ScryfallCardTextProvider";
import { ScryfallSetDataProvider } from "@/providers/ScryfallSetDataProvider";
import { CollectionTypesDataProvider } from "@/providers/CollectionCardTypeProvider";
import { CollectionSetsDataProvider } from "@/providers/CollectionSetProvider";

jest.mock("@/utils/dataFetch/scryfallSets", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/scryfallSets");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/utils/dataFetch/scryfallSymbols", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/scryfallSymbols");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/utils/dataFetch/collectionTypes", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/collectionTypes");
	return {
		__esModule: true,
		...originalModule,
	};
});

jest.mock("@/utils/dataFetch/collectionSets", () => {
	const originalModule = jest.requireActual("@/utils/dataFetch/collectionSets");
	return {
		__esModule: true,
		...originalModule,
	};
});

// jest.mock("@/components/utils/DataError", () => {
// 	const originalModule = jest.requireActual("@/components/utils/DataError");
// 	return {
// 		__esModule: true,
// 		...originalModule,
// 	};
// });

const getScryfallSetDataSpy = jest.spyOn(scryfallFetch, "getScryfallSetData");
const getScryfallSymbolDataSpy = jest.spyOn(symbolsFetch, "getScryfallSymbolData");
const getCollectionTypesSpy = jest.spyOn(typesFetch, "getCollectionTypes");
const getCollectionSetsSpy = jest.spyOn(setsFetch, "getCollectionSets");
// const dataErrorSpy = jest.spyOn(dataErrorComponent, "DataError");
// const dataErrorElement = jest.fn();

const typesMock = ["Elf", "Planeswalker"];
const setsMock = ["tar", "m10"];

describe("Search Layout", () => {
	beforeEach(() => {
		getScryfallSetDataSpy.mockResolvedValue({ data: setsList });
		getScryfallSymbolDataSpy.mockResolvedValue({ data: symbolsList });
		getCollectionTypesSpy.mockResolvedValue({ data: typesMock, success: true });
		getCollectionSetsSpy.mockResolvedValue({ data: setsMock, success: true });
		// dataErrorSpy.mockClear();
		// dataErrorSpy.mockImplementation(dataErrorElement);
	});
	it("should get scryfall set and symbol data", async () => {
		await SearchLayout({ children: <p>test</p> });

		expect(getScryfallSetDataSpy).toHaveBeenCalled();
		expect(getScryfallSymbolDataSpy).toHaveBeenCalled();
	});

	it("should return scryfall symbol and set data providers along with children object", async () => {
		const jsxElement = await SearchLayout({ children: <p>test</p> });

		expect(jsxElement).toEqual(
			<ScryfallSymbolDataProvider symbols={symbolsList}>
				<ScryfallSetDataProvider sets={setsList}>
					<CollectionTypesDataProvider types={typesMock}>
						<CollectionSetsDataProvider sets={setsMock}>
							{<p>test</p>}
						</CollectionSetsDataProvider>
					</CollectionTypesDataProvider>
				</ScryfallSetDataProvider>
			</ScryfallSymbolDataProvider>
		);
	});

	it("should render DataError if no set data or symbols data is fetched", async () => {
		getScryfallSetDataSpy.mockResolvedValue({ data: null });
		getScryfallSymbolDataSpy.mockResolvedValue({ data: null });
		getCollectionTypesSpy.mockResolvedValue({ data: typesMock, success: false });
		getCollectionSetsSpy.mockResolvedValue({ data: setsMock, success: false });

		const jsxElement = await SearchLayout({ children: <p>test</p> });

		expect(jsxElement).toEqual(<DataError />);
	});

	it("should return collection  data providers along with children object", async () => {
		const jsxElement = await SearchLayout({ children: <p>test</p> });

		expect(jsxElement).toEqual(
			<ScryfallSymbolDataProvider symbols={symbolsList}>
				<ScryfallSetDataProvider sets={setsList}>
					<CollectionTypesDataProvider types={typesMock}>
						<CollectionSetsDataProvider sets={setsMock}>
							{<p>test</p>}
						</CollectionSetsDataProvider>
					</CollectionTypesDataProvider>
				</ScryfallSetDataProvider>
			</ScryfallSymbolDataProvider>
		);
	});
});
