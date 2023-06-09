/**
 * @jest-environment node
 */
import { GET } from "@/app/api/scryfall/cards/route";
import axios from "axios";
import * as nextAuth from "next-auth/next";
import { generalSearchMockResults } from "@/tests/mocks/cardSearch.mock";

const getServerSessionSpy = jest.spyOn(nextAuth, "getServerSession");

const axiosGet = jest.spyOn(axios, "get");
axiosGet.mockResolvedValue({ data: generalSearchMockResults });

const req = new Request("http://localhost:3000/api/scryfall/cards?query=elf&page=1", {
	method: "GET",
});

describe("API route: /api/scryfall/cards", () => {
	describe("GET", () => {
		it("should return 401 if user is not signed in", async () => {
			getServerSessionSpy.mockResolvedValue(false);

			const response = await GET(req);

			expect(response.status).toEqual(401);
		});

		it("should make call to get card data", async () => {
			getServerSessionSpy.mockResolvedValue(true);

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.data).toEqual(generalSearchMockResults);
		});

		it("should return an empty array when no card data is found", async () => {
			getServerSessionSpy.mockResolvedValue(true);
			axiosGet.mockRejectedValue({ response: { data: { code: "not_found" } } });

			const response = await GET(req);
			const cardResults = await response.json();

			expect(cardResults.success).toEqual(false);
			expect(cardResults.data).toEqual([]);
		});
	});
});
