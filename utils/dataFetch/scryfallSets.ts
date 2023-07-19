export async function getScryfallSetData() {
	const endpoint = `https://api.scryfall.com/sets`;
	const response = await fetch(endpoint);

	try {
		return await response.json();
	} catch (e) {
		return false;
	}
}
