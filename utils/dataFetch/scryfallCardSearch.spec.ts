import {
	getSetParameter,
	makeGeneralSearch,
	makePrintSearch,
} from "@/utils/dataFetch/scryfallCardSearch";
import axios from "axios";
import { generalSearchMock as cardSearchResults } from "@/tests/mocks/cardSearch.mock";
import { ScryfallSearchCardData } from "@/types/scryfall";

const axiosSpy = jest.spyOn(axios, "get");
axiosSpy.mockResolvedValue({ data: cardSearchResults });

const searchCardData: ScryfallSearchCardData = {
	cardName: "cardNameTest",
	setCode: "setNameTest",
};

describe("cardSearch util", () => {
	describe("makeGeneralSearch", () => {
		it("should make call to card search api endpoint", async () => {
			await makeGeneralSearch(searchCardData);
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining(searchCardData.cardName));
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining(searchCardData.setCode));
		});

		it("should return apiCard result array", async () => {
			const results = await makeGeneralSearch(searchCardData);
			expect(results).toEqual(cardSearchResults?.data);
		});

		it("should include page param", async () => {
			await makeGeneralSearch(searchCardData, 2);
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining("page=2"));
		});
	});

	describe("makePrintSearch", () => {
		it("should make call to card search api endpoint", async () => {
			await makePrintSearch(searchCardData);
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining(searchCardData.cardName));
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining(searchCardData.setCode));
		});

		it("should return apiCard result array", async () => {
			const results = await makePrintSearch(searchCardData);
			expect(results).toEqual(cardSearchResults?.data);
		});

		it("should include unique print param", async () => {
			await makePrintSearch(searchCardData);
			expect(axiosSpy).toHaveBeenCalledWith(expect.stringContaining("unique=prints"));
		});
	});

	describe("getSetParameter", () => {
		const testSet = "tst";
		it("should add complete set parameter", () => {
			const setParam = getSetParameter(testSet);
			expect(setParam).toEqual(` set:${testSet},s${testSet},p${testSet}`);
		});

		it("should return empty string when setCode is empty", () => {
			const setParam = getSetParameter("");
			expect(setParam).toEqual("");
		});
	});
});
