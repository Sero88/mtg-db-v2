import { symbolsList } from "@/tests/mocks/symbolList.mock";
import { getScryfallSymbolData } from "./scryfallSymbols";

global.fetch = jest
	.fn()
	.mockImplementationOnce(() =>
		Promise.resolve({ json: () => Promise.resolve({ data: symbolsList }) })
	);

describe("getScryfallSymbolData", () => {
	it("should return list of symbols", async () => {
		const data = await getScryfallSymbolData();
		expect(data).toEqual({ data: symbolsList });
	});

	it("should return false when symbols not found or has error", async () => {
		global.fetch = jest.fn().mockImplementationOnce(() => undefined);

		const data = await getScryfallSymbolData();
		expect(data).toEqual(false);
	});
});
