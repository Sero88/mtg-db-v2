import { symbolTranslation } from "@/components/utils/CardTextUtil";
import { ScryfallSymbol } from "@/types/scryfall";
import styles from "@/styles/translatedCardText.module.scss";

type TranslatedCardTextProps = {
	symbols: Map<String, ScryfallSymbol>;
	textToTranslate: string;
};

export function TranslatedCardText({ symbols, textToTranslate }: TranslatedCardTextProps) {
	const separator = "|~|";
	const subs = `${separator}$1${separator}`;
	const textReplacedSymbols = textToTranslate.replace(/({[^{}]+})/gim, subs);

	const splitText = textReplacedSymbols.split(separator).filter((text) => text);

	const translatedText = splitText?.map((text, index) => {
		const textSymbol = symbols.get(text) ?? {
			english: text,
			svg_uri: null,
		};

		return symbolTranslation(textSymbol, index);
	});

	return <p className={styles.translatedCardText}>{translatedText}</p>;
}
