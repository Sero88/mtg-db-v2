import { UpdateStep } from "@/types/updatePrices";
import { StepStatusDisplay } from "./StepStatusDisplay";
import { render, screen } from "@testing-library/react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const steps: UpdateStep[] = [
	{ id: "step1", name: "step 1", callback: jest.fn() },
	{ id: "updateCollection", name: "step 2", callback: jest.fn() },
	{ id: "step2", name: "step 3", callback: jest.fn() },
];
const updatedCards = {
	current: 0,
	total: steps.length,
};
describe("StepStatusDisplay", () => {
	it("should only show first step by default", () => {
		render(<StepStatusDisplay currentStep={0} steps={steps} updatedCards={updatedCards} />);
		expect(screen.queryByText(steps[0].name)).not.toBeNull();
		expect(screen.queryByText(steps[1].name)).toBeNull();
	});
	it("should show all step names when it reaches the end", () => {
		render(<StepStatusDisplay currentStep={2} steps={steps} updatedCards={updatedCards} />);
		steps.forEach((step) => {
			expect(screen.queryByText(step.name)).not.toBeNull();
		});
	});
	it("should show updateCollection step progress", () => {
		render(<StepStatusDisplay currentStep={1} steps={steps} updatedCards={updatedCards} />);
		screen.getByText(`Card ${updatedCards.current + 1} of ${updatedCards.total} 33%`);
	});

	it("should showing loader by default", () => {
		const { baseElement } = render(
			<StepStatusDisplay currentStep={0} steps={steps} updatedCards={updatedCards} />
		);
		expect(baseElement.innerHTML).toMatch(`data-icon="${faSpinner.iconName}"`);
	});

	it("should stop showing loader when update is complete", () => {
		const { baseElement } = render(
			<StepStatusDisplay
				currentStep={steps.length}
				steps={steps}
				updatedCards={updatedCards}
			/>
		);
		expect(baseElement.innerHTML).not.toMatch(`data-icon="${faSpinner.iconName}"`);
	});
});
