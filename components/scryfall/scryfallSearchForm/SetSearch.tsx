import styles from "@/styles/search.module.scss";
import { SetOptionsList } from "./SetOptionsList";
import { useContext } from "react";
import { ScryfallSetDataContext } from "@/contexts/ScryfallSetDataContext";

type SetSearchProps = {
	selectedSet: string;
	setChangeHandler: (newSelectedSet: string) => void;
};

export const SetSearch = ({ selectedSet, setChangeHandler }: SetSearchProps) => {
	const sets = useContext(ScryfallSetDataContext);
	const onChangeSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setChangeHandler(event.target.value);
	};

	return (
		<label className={styles.setField}>
			<span>Card Set: </span>
			<select value={selectedSet} onChange={onChangeSet}>
				<option value="">All sets</option>
				<SetOptionsList setsData={sets} />
			</select>
		</label>
	);
};
