import { elvishMysticCollectionCardWithVersions } from "@/tests/mocks/collectionCard.mock";
import { CollectionCardVersionsList } from "./CollectionCardVersionsList";
import { render, screen } from "@testing-library/react";
import * as TableCollectionVersionRowsComponent from "./TableCollectionVersionRows";

jest.mock("./TableCollectionVersionRows", () => {
	const originalModule = jest.requireActual("./TableCollectionVersionRows");
	return {
		__esModule: true,
		...originalModule,
	};
});

const tableRowsSpy = jest.spyOn(TableCollectionVersionRowsComponent, "TableCollectionVersionRows");

const selectionHandler = jest.fn();
describe("CollectionCardVersionsList", () => {
	it("should display table with respective headers", () => {
		const expectedHeaders = ["Version", "Regular", "Foil", "Prices (R|F)"];
		render(
			<CollectionCardVersionsList
				versions={elvishMysticCollectionCardWithVersions.versions}
				selectedVersion={elvishMysticCollectionCardWithVersions.versions[0]}
				selectionHandler={selectionHandler}
			/>
		);

		const tableHeaders = screen.queryAllByRole("columnheader");

		tableHeaders.forEach((headerElement, index) => {
			expect(headerElement.innerHTML).toEqual(expectedHeaders[index]);
		});
	});

	it("should call TableCollectionVersionRows with correct props", () => {
		render(
			<CollectionCardVersionsList
				versions={elvishMysticCollectionCardWithVersions.versions}
				selectedVersion={elvishMysticCollectionCardWithVersions.versions[0]}
				selectionHandler={selectionHandler}
			/>
		);

		expect(tableRowsSpy).toHaveBeenCalledWith(
			{
				versions: elvishMysticCollectionCardWithVersions.versions,
				selectedVersion: elvishMysticCollectionCardWithVersions.versions[0],
				selectionHandler: selectionHandler,
			},
			{}
		);
	});
});
