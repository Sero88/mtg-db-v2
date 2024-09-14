import Image from "next/image";
import { CollectionOption } from "./CollectionOption";
import { render, screen } from "@testing-library/react";
import * as LinkComp from "next/link";
import "@testing-library/jest-dom";
jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

//@ts-ignore it is render that method that gets called
const linkSpy = jest.spyOn(LinkComp, "render");

const bgImage = "/images/bg.png";
const mainImage = "images/main.png";
const title = "test option";
const mainImagePosition = "left";
const link = "/collection/test";

describe("CollectionOption", () => {
	it("should display background and main image", () => {
		render(
			<CollectionOption
				imageBg={bgImage}
				mainImage={mainImage}
				title={title}
				mainImagePosition={mainImagePosition}
				link={link}
			/>
		);

		expect(Image).toHaveBeenCalledWith(expect.objectContaining({ src: mainImage }), {});
		expect(Image).toHaveBeenCalledWith(expect.objectContaining({ src: bgImage }), {});
	});

	it("should use link with correct link property", () => {
		render(
			<CollectionOption
				imageBg={bgImage}
				mainImage={mainImage}
				title={title}
				mainImagePosition={mainImagePosition}
				link={link}
			/>
		);

		expect(linkSpy).toHaveBeenCalledWith(expect.objectContaining({ href: link }), null);
	});

	it("should display title", () => {
		render(
			<CollectionOption
				imageBg={bgImage}
				mainImage={mainImage}
				title={title}
				mainImagePosition={mainImagePosition}
				link={link}
			/>
		);

		const renderedTitle = screen.getByText(title);
		expect(renderedTitle).toBeInTheDocument();
	});
});
