export const Helpers = {
	getDataset: (element: HTMLElement, name: string) =>
		element?.dataset?.[name] ? element.dataset[name] : null,
};
