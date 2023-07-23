import { ScryfallSet } from "@/types/scryfall";
import { SetUtil } from "@/utils/setUtil";
import { ReactElement } from "react";
export function SetOptionsList({ setsData }: { setsData: ScryfallSet[] }) {
	if (!setsData) {
		return null;
	}

	const setList: ReactElement[] = [];

	setsData?.forEach((set: ScryfallSet) => {
		if (SetUtil.isAllowedSearchSet(set)) {
			setList.push(
				<option value={set.code} key={`set${set.code}`}>
					{set.name}
				</option>
			);
		}
	});

	return <>{setList}</>;
}
