import { elvishMystic, nissaVastwoodSeer } from "@/tests/mocks/scryfallCard.mock";
import { CollectionCardMenu } from "./CollectionCardMenu";
import { CollectionCardQuantityTypeEnum } from "@/types/collection";
import { render, screen } from "@testing-library/react";

const quantity = {
	[CollectionCardQuantityTypeEnum.REGULAR]: 1,
	[CollectionCardQuantityTypeEnum.FOIL]: 2,
};

describe("CollectionCardMenu", () => {
	it("should display logo", () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		expect(screen.queryByAltText("collection logo")).not.toBeNull();
	});

	it("should display passed quantities for both input types", () => {
		render(<CollectionCardMenu cardData={elvishMystic} quantity={quantity} />);

		const regularInput = screen.getByTestId("regular-input");
		const foilInput = screen.getByTestId("foil-input");

		expect(regularInput).not.toBeNull();
		expect(regularInput).toHaveProperty(
			"value",
			String(quantity[CollectionCardQuantityTypeEnum.REGULAR])
		);

		expect(foilInput).not.toBeNull();
		expect(foilInput).toHaveProperty(
			"value",
			String(quantity[CollectionCardQuantityTypeEnum.FOIL])
		);
	});

	it("should not display regular input if card only has foil version", () => {
		render(<CollectionCardMenu cardData={nissaVastwoodSeer} quantity={quantity} />);

		expect(screen.queryByTestId("regular-input")).toBeNull();
		expect(screen.queryByTestId("foil-input")).not.toBeNull();
	});

	it("should not display foil input if card only has regular version", () => {
		render(
			<CollectionCardMenu
				cardData={{ ...nissaVastwoodSeer, finishes: ["nonfoil"] }}
				quantity={quantity}
			/>
		);

		expect(screen.queryByTestId("regular-input")).not.toBeNull();
		expect(screen.queryByTestId("foil-input")).toBeNull();
	});
});
