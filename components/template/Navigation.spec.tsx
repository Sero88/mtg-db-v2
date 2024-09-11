import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { faChartBar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as LinkComp from "next/link";

//@ts-ignore it is render that method that gets called
const linkSpy = jest.spyOn(LinkComp, "render");

describe("Navigation", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should show all links", () => {
		render(<Navigation />);
		expect(screen.getAllByRole("listitem").length).toEqual(3);
	});
	it("should how icons for each item", () => {
		const { baseElement } = render(<Navigation />);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faSearch.iconName}"`);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faPlus.iconName}"`);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faChartBar.iconName}"`);
	});

	it("all items in nav are links", () => {
		render(<Navigation />);
		expect(linkSpy).toHaveBeenCalledTimes(3);
	});
});
