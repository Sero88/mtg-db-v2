import { symbolsList } from "@/tests/mocks/symbolList.mock";

export async function getScryfallSymbolData() {
	return { data: symbolsList };
}
