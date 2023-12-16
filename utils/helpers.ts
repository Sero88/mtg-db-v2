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
};
