// @ts-nocheck
"use client";

import { useMemo, useState } from "react";

let numberOptions = [];

for (let x = 0; x <= 100; x++) {
	numberOptions.push(x);
}

function getPossibleRange(currentOptions, range) {
	const newOptions = [];
	for (let x = range.greater + 1; x <= range.less - 1; x++) {
		newOptions.push(x);
	}

	return newOptions;
}

function getPossibleAddition(currentOptions, additionOption) {
	const newPossibleOptions = [];
	const desiredAddition = Number(additionOption);

	currentOptions.filter((option) => {
		const decimalString = String((option * 0.1).toFixed(1));
		const splitNums = decimalString.split(".");

		const addition = splitNums.reduce(
			(accumulator, currentValue) => accumulator + Number(currentValue),
			0,
		);

		if (desiredAddition == addition) {
			newPossibleOptions.push(option);
		}
	});

	return newPossibleOptions;
}

function getPossibleDigits(currentOptions, specificDigits) {
	const leftDigitArr = specificDigits?.left?.length ? specificDigits.left.split("") : [];
	const rightDigitArr = specificDigits?.right?.length ? specificDigits.right.split("") : [];
	const newPossibleOptions = [];

	currentOptions.filter((option) => {
		let added = false;
		const decimalString = String((option * 0.1).toFixed(1));
		const splitNums = decimalString.split(".");

		if (
			leftDigitArr.length &&
			leftDigitArr.includes(splitNums[0]) &&
			rightDigitArr.length &&
			rightDigitArr.includes(splitNums[1])
		) {
			newPossibleOptions.push(option);
		} else if (
			leftDigitArr.length &&
			leftDigitArr.includes(splitNums[0]) &&
			!rightDigitArr.length
		) {
			newPossibleOptions.push(option);
		} else if (
			rightDigitArr.length &&
			rightDigitArr.includes(splitNums[1]) &&
			!leftDigitArr.length
		) {
			newPossibleOptions.push(option);
		}
	});

	return newPossibleOptions;
}

export default function AddPage() {
	const initialRange = { greater: 10, less: 100 };
	const initialSpecificDigits = { left: "", right: "" };
	const [range, setRange] = useState(initialRange);
	const [addition, setAddition] = useState("");
	const [specificDigits, setSpecificDigits] = useState(initialSpecificDigits);
	//const [possibleOptions, setPossibleOptions] = useState(getPossibleRange(numberOptions, range));

	const updateRange = (event: React.ChangeEvent<HTMLInputElement>, type: "greater" | "less") => {
		const newRange = { ...range, [type]: Number(event.target.value) };
		setRange(newRange);
	};

	const resetForm = () => {
		setRange(initialRange);
		setSpecificDigits(initialSpecificDigits);
		setAddition("");
	};

	let possibleOptions = getPossibleRange(numberOptions, range);
	possibleOptions = addition ? getPossibleAddition(possibleOptions, addition) : possibleOptions;
	possibleOptions =
		specificDigits.left || specificDigits.right
			? getPossibleDigits(possibleOptions, specificDigits)
			: possibleOptions;

	const displayOptions = possibleOptions.map((number) => {
		return <span>{number}</span>;
	});

	return (
		<>
			<h1>Treasure Opener</h1>
			<div style={{ display: "flex", gap: 5, width: "100px", flexWrap: "wrap" }}>
				{displayOptions}
			</div>

			<form>
				<label>{`Greater than (>)`}</label>
				<input
					type="text"
					value={range.greater}
					onChange={(event) => updateRange(event, "greater")}
					onFocus={(e) => e.target.select()}
				/>

				<label>{`Less than (<)`}</label>
				<input
					type="text"
					value={range.less}
					onChange={(event) => updateRange(event, "less")}
					onFocus={(e) => e.target.select()}
				/>

				<div>
					<label>Both digits add to:</label>
					<input
						type="text"
						value={addition}
						onChange={(event) => setAddition(event.target.value)}
					/>
				</div>

				<div>
					<label>Left Digit:</label>
					<input
						type="text"
						value={specificDigits.left}
						onChange={(event) =>
							setSpecificDigits({ ...specificDigits, left: event.target.value })
						}
					/>

					<label>Right Digit:</label>
					<input
						type="text"
						value={specificDigits.right}
						onChange={(event) =>
							setSpecificDigits({ ...specificDigits, right: event.target.value })
						}
					/>
				</div>

				<button type="button" onClick={resetForm}>
					Reset
				</button>
			</form>
		</>
	);
}
