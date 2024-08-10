import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "@/styles/displayError.module.scss";

export function DisplayError({ errorMessage }: { errorMessage: string }) {
	return (
		<p className={style.error}>
			<FontAwesomeIcon icon={faWarning} />
			{` `}
			{errorMessage}
		</p>
	);
}
