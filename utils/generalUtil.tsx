export const GeneralUtil = {
	collectionLimit: 4, //limit of each card in collection

	apiResponse: function (success: boolean, data: unknown = undefined) {
		return {
			success,
			data,
		};
	},

	convertNameToHtmlId(name: string): string {
		return name.replace(/\s/g, "-");
	},
};
