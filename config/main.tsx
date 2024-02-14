import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const Config = {
	collectionLimit: 4, //limit of each card in collection
	customCardTextSymbols: [
		{ symbol: "−", svg_uri: "", english: "− planeswalker minus ability", icon: faMinus },
		{ symbol: "+", svg_uri: "", english: "+ planeswalker plus ability", icon: faPlus },
	],
};
