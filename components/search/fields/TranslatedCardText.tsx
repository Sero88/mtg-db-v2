import { symbolTranslation } from "@/components/utils/CardText";
import { ScryfallSymbol } from "@/types/scryfall";

type TranslatedCardTextProps = {
	symbols: Map<String, ScryfallSymbol>;
	textToTranslate: string;
};

export function TranslatedCardText({ symbols, textToTranslate }: TranslatedCardTextProps) {
	const separator = "|~|";
	const subs = `${separator}$1${separator}`;
	const textReplacedSymbols = textToTranslate.replace(/({[^{}]+})/gim, subs);

	const splitText = textReplacedSymbols.split(separator).filter((text) => text);

	const translatedText = splitText?.map((text) => {
		const textSymbol = symbols.get(text) ?? {
			english: text,
			svg_uri: null,
		};

		return symbolTranslation(textSymbol);
	});

	return <p>{translatedText}</p>;
}
