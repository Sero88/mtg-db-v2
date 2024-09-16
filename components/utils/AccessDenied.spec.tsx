import { fireEvent, render, screen } from "@testing-library/react";
import Image from "next/image";
import { AccessDenied } from "./AccessDenied";
import * as NextAuthReact from "next-auth/react";

jest.mock("next/image", () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

const signInSpy = jest.spyOn(NextAuthReact, "signIn");
signInSpy.mockImplementation(undefined);

describe("AccessDenied", () => {
	it("should show cannot pass image", () => {
		render(<AccessDenied />);
		expect(Image).toHaveBeenCalledWith(
			expect.objectContaining({ src: "/images/ltr-38-you-cannot-pass.jpg" }),
			{}
		);
	});

	it("should show sign in button", () => {
		render(<AccessDenied />);
		expect(screen.queryByRole("button", { name: "Sign In" })).not.toBeNull();
	});

	it("should call nextAuth sign in function when button is clicked", () => {
		render(<AccessDenied />);
		const signInButton = screen.getByRole("button", { name: "Sign In" });
		fireEvent.click(signInButton);
		expect(signInSpy).toHaveBeenCalled();
	});
});
