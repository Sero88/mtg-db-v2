export const Helpers = {
	apiResponse: function (success: boolean, data: unknown = undefined) {
		return {
			success,
			data,
		};
	},

	convertNameToHtmlId(name: string): string {
		return name.replace(/\s/g, "-");
	},

	getDataset: (element: HTMLElement, name: string) =>
		element?.dataset?.[name] ? element.dataset[name] : null,

	formatAmount: (amount: number) => {
		return Math.round(amount * 100) / 100;
	},

	getPercentage: (partial: number, total: number) => {
		//toFixed automatically rounds
		return ((partial * 100) / total).toFixed(0) + "%";
	},
};
