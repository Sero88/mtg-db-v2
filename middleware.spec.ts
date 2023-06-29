/**
 * @jest-environment node
 */
import axios from "axios";

const paths = [
	{
		name: "collection",
		endpoint:
			"http://localhost:3000/api/collection/search/quantity-by-id?action=searchIds&cardIds=[%222267c580-b641-4d6f-8bd9-deb1c6393d14%22,%20%22e8534c3b-440e-4c13-a27d-819bb325c0e6%22]",
	},
	{ name: "scryfall", endpoint: "http://localhost:3000/api/scryfall/cards?query=elf&page=1" },
];

process.env.NEXTAUTH_SECRET = "123";
describe("middleware", () => {
	test.each(paths)("all path api/$name/ should redirect to login", async (path) => {
		const response = await axios.get(path.endpoint);
		expect(response.request.path).toEqual(expect.stringMatching(/api\/auth/));
	});
});
