export async function getScryfallSymbolData() {
	const endpoint = `https://api.scryfall.com/symbology`;
	const response = await fetch(endpoint);

	try {
		return await response.json();
	} catch (e) {
		return false;
	}
}
