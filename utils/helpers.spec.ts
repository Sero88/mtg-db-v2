import { helpers } from "./helpers";

describe("util helpers", () => {
	describe("convertNameToHtmlId", () => {
		it("should replace empty spaces with -", () => {
			const id = helpers.convertNameToHtmlId("this is a test");
			expect(id).toEqual("this-is-a-test");
		});
	});

	describe("apiResponse", () => {
		it("should return object with success and data properties", () => {
			const response = helpers.apiResponse(false, []);
			expect(response).toEqual({ data: [], success: false });
		});

		it("should return data as undefined if data argument is not passed", () => {
			const response = helpers.apiResponse(false);
			expect(response).toEqual({ data: undefined, success: false });
		});
	});
});
