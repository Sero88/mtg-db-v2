import { Helpers } from "./helpers";

describe("Helpers Utils", () => {
	describe("getDataset", () => {
		const testValue = "test dataset";
		const htmlElement = document.createElement("div");
		htmlElement.dataset.test = testValue;

		it("should get the specified dataset from the element", () => {
			const testDataset = Helpers.getDataset(htmlElement, "test");

			expect(testDataset).toEqual(testValue);
		});

		it("should return null when dataset is not defined", () => {
			const testDataset = Helpers.getDataset(htmlElement, "fake");

			expect(testDataset).toBeNull();
		});
	});
});
