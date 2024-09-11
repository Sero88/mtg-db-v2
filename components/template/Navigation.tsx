import { faChartBar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/collection/search">
						<FontAwesomeIcon icon={faSearch} /> Search
					</Link>
				</li>
				<li>
					<Link href="/collection/add">
						<FontAwesomeIcon icon={faPlus} /> Add Cards
					</Link>
				</li>
				<li>
					<Link href="/reports">
						<FontAwesomeIcon icon={faChartBar} /> Data
					</Link>
				</li>
			</ul>
		</nav>
	);
}
