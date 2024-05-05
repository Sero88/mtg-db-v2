import { elvishMysticCollectionCardWithVersions } from "@/tests/mocks/collectionCard.mock";
import { render, screen } from "@testing-library/react";
import { TableCollectionVersionRows } from "./TableCollectionVersionRows";
import { setsList } from "@/tests/mocks/setsList.mock";
import * as IconImageComponent from "@/components/cards/IconImage";
import React from "react";

jest.mock("@/components/cards/IconImage", () => {
	const originalModule = jest.requireActual("@/components/cards/IconImage");
	return {
		__esModule: true,
		...originalModule,
	};
});

React.useContext = jest.fn().mockReturnValue(setsList);

const iconImageSpy = jest.spyOn(IconImageComponent, "IconImage");
describe("TableCollectionVersionRows", () => {
	const selectionHandler = jest.fn();
	const selectedVersion = elvishMysticCollectionCardWithVersions.versions[0];
	const versions = elvishMysticCollectionCardWithVersions.versions;

	it("should display correct amount of rows", () => {
		render(
			<table>
				<tbody>
					<TableCollectionVersionRows
						versions={versions}
						selectedVersion={selectedVersion}
						selectionHandler={selectionHandler}
					/>
				</tbody>
			</table>
		);

		expect(screen.getAllByRole("row").length).toEqual(versions.length);
	});

	it("should display correct cell data", () => {
		const expectedCells = ["M14 1 promo", "2", "1", "$1 | $2"];
		render(
			<table>
				<tbody>
					<TableCollectionVersionRows
						versions={[selectedVersion]}
						selectedVersion={selectedVersion}
						selectionHandler={selectionHandler}
					/>
				</tbody>
			</table>
		);

		const cells = screen.getAllByRole("cell");

		cells.forEach((cell, index) => {
			expect(cell.textContent).toEqual(expectedCells[index]);
		});
	});

	it("should call IconImage to display set image", () => {
		const modifiedSelectedVersion = { ...selectedVersion, set: "tst" };
		render(
			<table>
				<tbody>
					<TableCollectionVersionRows
						versions={[modifiedSelectedVersion]}
						selectedVersion={selectedVersion}
						selectionHandler={selectionHandler}
					/>
				</tbody>
			</table>
		);

		expect(iconImageSpy).toHaveBeenCalled();
	});

	it("should display N/A and zero when card type is not in collection", () => {
		const expectedCells = ["M14 1 promo", "0", "0", "N/A | N/A"];
		const modifiedSelectedVersion = {
			...selectedVersion,
			quantity: {},
			prices: { regular: null, foil: null },
		};

		render(
			<table>
				<tbody>
					<TableCollectionVersionRows
						versions={[modifiedSelectedVersion]}
						selectedVersion={modifiedSelectedVersion}
						selectionHandler={selectionHandler}
					/>
				</tbody>
			</table>
		);

		const cells = screen.getAllByRole("cell");

		cells.forEach((cell, index) => {
			expect(cell.textContent).toEqual(expectedCells[index]);
		});
	});
});
