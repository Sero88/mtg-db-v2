import { UpdateStep } from "@/types/updatePrices";
//import style from "@/styles/updateStatusDisplay.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";
import { Helpers } from "@/utils/helpers";

type StepStatusDisplayProps = {
	steps: UpdateStep[];
	currentStep: number;
	updatedCards: {
		total: number;
		current: number;
	};
};

export function StepStatusDisplay({
	steps,
	currentStep: currentStepIndex,
	updatedCards,
}: StepStatusDisplayProps) {
	const currentCard = updatedCards.current + 1;
	const totalCards = updatedCards.total;
	const showLoader = currentStepIndex < steps.length - 1;

	let stepsTakenLog = [];
	for (let i = 0; i <= currentStepIndex && i < steps.length; i++) {
		const stepName = steps[i]?.name;
		let stepInfo: ReactElement | string = "";

		switch (steps[i].id) {
			case "updateCollection":
				stepInfo = (
					<ul>
						<li>
							{`Card ${currentCard} of ${totalCards} `}
							{`(${Helpers.getPercentage(currentCard, totalCards)})`}
						</li>
					</ul>
				);
				break;
		}

		stepsTakenLog.push(
			<li key={i}>
				{stepName}
				{stepInfo}
			</li>
		);
	}

	return (
		<>
			<ul>{stepsTakenLog}</ul>
			{showLoader && <FontAwesomeIcon icon={faSpinner} spinPulse={true} />}
		</>
	);
}
