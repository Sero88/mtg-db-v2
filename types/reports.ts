export interface ReportData {
	quantity: {
		regular: number;
		foil: number;
		unique: number;
		total: number;
		sets: number;
		rarity: {
			common: number;
			uncommon: number;
			rare: number;
			mythic: number;
			special: number;
			bonus: number;
			[type: string]: number;
		};
	};

	prices: {
		rares: number;
		foil: number;
		regular: number;
		total: number;
	};
}
