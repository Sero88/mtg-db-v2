import { collectionVersionsMock } from "@/tests/mocks/collectionVersions.mock";
import { getReportData } from "./reportsUtil";
import { Helpers } from "./helpers";

describe("Reports Util", () => {
	describe("getReportData", () => {
		it("should return expected reports data", () => {
			const expectedVersionsData = {
				quantity: {
					regular: 73,
					foil: 37,
					unique: 43,
					total: 110,
					sets: 32,
					rarity: {
						common: 13,
						uncommon: 26,
						rare: 32,
						mythic: 38,
						special: 1,
						bonus: 0,
					},
				},
				prices: {
					rares: 389.08,
					foil: 266.97,
					regular: 213.45,
					total: 480.42,
				},
			};
			const versions = getReportData(collectionVersionsMock);
			expect(versions).toEqual(expectedVersionsData);
		});
	});
});
