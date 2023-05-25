import { setsList } from "@/tests/mocks/setsList.mock";
import { getScryfallSetData } from "./scryfallSets";

global.fetch = jest
	.fn()
	.mockImplementationOnce(() =>
		Promise.resolve({ json: () => Promise.resolve({ data: setsList }) })
	);

describe("getScryfallSetData", () => {
	it("should return list of sets", async () => {
		const data = await getScryfallSetData();
		expect(data).toEqual({ data: setsList });
	});

	it("should return false when sets not found or has error", async () => {
		global.fetch = jest.fn().mockImplementationOnce(() => undefined);

		const data = await getScryfallSetData();
		expect(data).toEqual(false);
	});
});
