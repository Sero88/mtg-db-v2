import { useGetCollectionWithVersions } from "@/hooks/useGetCollectionWithVersions";
import { useEffect, useState } from "react";
import { QueryResult } from "../utils/QueryResult";
import style from "@/styles/downloadCardData.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export function DownloadCardData() {
	const [updateTime, setUpdateTime] = useState<Date>();
	const collectionData = useGetCollectionWithVersions(updateTime);

	useEffect(() => {
		if (collectionData.data) {
			const collectionCards = collectionData.data;
			var element = document.createElement("a");
			element.setAttribute(
				"href",
				"data:application/json;charset=utf-8," +
					encodeURIComponent(JSON.stringify(collectionCards))
			);
			element.setAttribute("download", "collection");
			element.style.display = "none";
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
		}
	}, [collectionData.data]);

	return (
		<QueryResult
			queryResult={{
				data: true,
				isLoading: collectionData.isLoading,
				error: collectionData.isError,
			}}
		>
			<button className={style.downloadButton} onClick={() => setUpdateTime(new Date())}>
				<FontAwesomeIcon icon={faDownload} />
				Download Card Data
			</button>
		</QueryResult>
	);
}
