import { setsList } from "../tests/mocks/setsList.mock";
import { SetUtil } from "./setUtil";

describe("SetUtil", () => {
	describe("isAllowedSearchSet", () => {
		it("should return true when set is allowed", async () => {
			const isAllowed = SetUtil.isAllowedSearchSet(setsList[0]);
			expect(isAllowed).toEqual(true);
		});

		it("should return false when set is not allowed", async () => {
			const isAllowed = SetUtil.isAllowedSearchSet(setsList[2]);
			expect(isAllowed).toEqual(false);
		});
	});
});
