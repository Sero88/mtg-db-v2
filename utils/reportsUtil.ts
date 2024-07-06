import { CardRarityEnum } from "@/types/card";
import { Version } from "@/types/collection";
import { ReportData } from "@/types/reports";
import { Helpers } from "./helpers";

export function createInitialReportData(): ReportData {
	return {
		quantity: {
			regular: 0,
			foil: 0,
			unique: 0,
			total: 0,
			sets: 0,
			rarity: {
				common: 0,
				uncommon: 0,
				rare: 0,
				mythic: 0,
				special: 0,
				bonus: 0,
			},
		},
		prices: {
			rares: 0,
			foil: 0,
			regular: 0,
			total: 0,
		},
	};
}

export function getReportData(versions: Version[]) {
	const reportData = createInitialReportData();

	if (!versions.length) {
		return reportData;
	}

	const sets = new Set();

	versions.forEach((version) => {
		//quantities
		const qtyRegular = version.quantity?.regular ?? 0;
		const qtyFoil = version.quantity?.foil ?? 0;

		reportData.quantity.regular += qtyRegular;
		reportData.quantity.foil += qtyFoil;
		reportData.quantity.rarity[version.rarity] += qtyRegular + qtyFoil;

		//prices
		const priceRegular = version.prices?.regular ?? 0;
		const priceFoil = version.prices?.foil ?? 0;

		reportData.prices.regular += qtyRegular * priceRegular;
		reportData.prices.foil += qtyFoil * priceFoil;

		//rares and mythic prices only
		const isVersionRareOrMythic =
			version.rarity == CardRarityEnum[CardRarityEnum.rare] ||
			version.rarity == CardRarityEnum[CardRarityEnum.mythic];

		if (isVersionRareOrMythic) {
			reportData.prices.rares += qtyRegular * priceRegular;
			reportData.prices.rares += qtyFoil * priceFoil;
		}

		//get unique sets
		sets.add(version.set);
	});

	reportData.quantity.total = reportData.quantity.regular + reportData.quantity.foil;
	reportData.quantity.sets = sets.size;

	reportData.quantity.unique = versions.length;
	reportData.prices.regular = Helpers.formatAmount(reportData.prices.regular);
	reportData.prices.foil = Helpers.formatAmount(reportData.prices.foil);
	reportData.prices.rares = Helpers.formatAmount(reportData.prices.rares);
	reportData.prices.total = Helpers.formatAmount(
		reportData.prices.regular + reportData.prices.foil
	);

	return reportData;
}
