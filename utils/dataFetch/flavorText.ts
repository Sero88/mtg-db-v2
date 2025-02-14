import { CardCollection } from "@/models/cardCollection";
import { CollectionCard } from "@/types/collection";

export async function getFlavorText() {
	const flavorTextData = { cardName: "", flavorText: "" };

	const cardCollection = new CardCollection();
	await cardCollection.dbConnect();

	const results = await cardCollection.getDailyFlavorText();
	const collectionData = results.data as CollectionCard;

	const cardFaces = collectionData.cardFaces?.length ? collectionData.cardFaces : [];
	const flavorTexts: string[] = [];
	cardFaces.forEach((face) => {
		if (face.flavorText) {
			flavorTexts.push(face.flavorText);
		}
	});

	flavorTextData.cardName = collectionData.name;
	flavorTextData.flavorText = flavorTexts[Math.floor(Math.random() * flavorTexts.length)];

	return flavorTextData;
}
