import { render } from "@testing-library/react";
import { Header } from "./Header";
import Image from "next/image";
import * as NextNav from "next/navigation";
import { Navigation } from "./Navigation";
import * as LinkComp from "next/link";

jest.mock("./Navigation");
const NavigationMock = jest.mocked(Navigation);

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

jest.mock("next/navigation", () => {
	const originalModule = jest.requireActual("next/navigation");
	return {
		__esModule: true,
		...originalModule,
	};
});

const usePathNameSpy = jest.spyOn(NextNav, "usePathname");

//@ts-ignore it is render that method that gets called
const linkSpy = jest.spyOn(LinkComp, "render");

describe("Header", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		usePathNameSpy.mockReturnValue("/");
	});
	it("should display logo", () => {
		render(<Header />);
		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ src: "/images/logo.png" }),
			{}
		);
	});

	it("should show navigation when is not homepage ", () => {
		usePathNameSpy.mockReturnValue("/test");
		render(<Header />);

		expect(NavigationMock).toHaveBeenCalled();
	});

	it("should not show navigation when is homepage ", () => {
		render(<Header />);

		expect(NavigationMock).not.toHaveBeenCalled();
	});

	it("should provide link to home", () => {
		render(<Header />);

		expect(linkSpy).toHaveBeenCalledWith(expect.objectContaining({ href: "/" }), null);
	});
});
