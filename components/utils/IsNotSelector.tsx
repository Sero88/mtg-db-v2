import { IsNotSelectorItem } from "@/types/isNotSelector";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IsNotSelectorProps = {
	items: Map<String, IsNotSelectorItem>;
	updateTypes: (newSelectedTypes: Map<String, IsNotSelectorItem>) => void;
};

export function IsNotSelector({ items }: IsNotSelectorProps) {
	const isNotSelectorItems = Array.from(items.values()).map((item, index) => {
		return (
			<li key={`${item.value}-${index}`}>
				<FontAwesomeIcon icon={faClose} />
				{item.is ? <span>IS</span> : <span>NOT</span>}
				<span>{item.value}</span>
			</li>
		);
	});

	return (
		<div>
			<ul>{isNotSelectorItems}</ul>
		</div>
	);
}
