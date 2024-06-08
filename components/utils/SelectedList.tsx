import { SelectorListItem } from "@/types/searchSelector";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SelectedListProps = {
	list: SelectorListItem[];
	removeHandler: (itemValue: string) => void;
};
export function SelectedList({ list, removeHandler }: SelectedListProps) {
	const selectedItems = list.map((item, index) => {
		return (
			<li key={`${item.value}-${index}`}>
				<FontAwesomeIcon
					icon={faClose}
					onClick={() => removeHandler(item.value)}
					data-testid={`remove-${item.value}`}
				/>
				{item.display}
			</li>
		);
	});
	return (
		<div>
			<ul>{selectedItems}</ul>
		</div>
	);
}
