/**
 * @jest-environment node
 */
import { GET } from "@/app/api/scryfall/cards/route";
import axios from "axios";
import { generalSearchMockResults, noResultsMockSearch } from "@/tests/mocks/cardSearch.mock";

const axiosGet = jest.spyOn(axios, "get");
axiosGet.mockResolvedValue({ data: generalSearchMockResults });

const req = new Request("http://localhost:3000/api/scryfall/cards?query=elf&page=1", {
	method: "GET",
});

const reqPrints = new Request(
	"http://localhost:3000/api/scryfall/cards?query=elf&unique=prints&order=released&dir=asc",
	{
		method: "GET",
	}
);

describe("API route: /api/scryfall/cards", () => {
	describe("GET", () => {
		/**
		 * no longer needed due to middleware, but keeping as example
		 * it("should return 401 if user is not signed in", async () => {
			getServerSessionSpy.mockResolvedValue(false);

			const response = await GET(req);

			expect(response.status).toEqual(401);
		});

		 */

		it("should make call to get card data with correct params", async () => {
			const expectedEndpoint =
				"https://api.scryfall.com/cards/search/?q=elf game:paper lang:en&order=released&dir=asc&page=1";
			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.data).toEqual(generalSearchMockResults);
			expect(axiosGet).toHaveBeenCalledWith(expectedEndpoint);
		});

		it("should make call to get params with optional param", async () => {
			const expectedEndpoint =
				"https://api.scryfall.com/cards/search/?q=elf game:paper lang:en&order=released&dir=asc&unique=prints&page=1";
			const response = await GET(reqPrints);
			const cardResults = await response.json();

			expect(cardResults.data).toEqual(generalSearchMockResults);
			expect(axiosGet).toHaveBeenCalledWith(expectedEndpoint);
		});

		it("should return an empty array when no card data is found", async () => {
			axiosGet.mockRejectedValue({ response: { data: { code: "not_found" } } });

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual(noResultsMockSearch);
		});

		it("should return error when something fetching data errs", async () => {
			axiosGet.mockRejectedValue(new Error("test"));

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual(null);
			expect(response.status).toEqual(500);
		});
	});
});
