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

	describe("convertNameToHtmlId", () => {
		it("should replace empty spaces with -", () => {
			const id = Helpers.convertNameToHtmlId("this is a test");
			expect(id).toEqual("this-is-a-test");
		});
	});

	describe("apiResponse", () => {
		it("should return object with success and data properties", () => {
			const response = Helpers.apiResponse(false, []);
			expect(response).toEqual({ data: [], success: false });
		});

		it("should return data as undefined if data argument is not passed", () => {
			const response = Helpers.apiResponse(false);
			expect(response).toEqual({ data: undefined, success: false });
		});
	});
});
