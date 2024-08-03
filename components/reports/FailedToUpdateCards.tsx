import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { CollectionCard, Version } from "@/types/collection";
import { QueryResult } from "../utils/QueryResult";
import { QueryResultData } from "@/types/queryResult";
import { useMemo } from "react";
import style from "@/styles/failedToUpdateCards.module.scss";

type FailedToUpdateCardsProps = {
	failedToUpdateVersions: Version[];
};
export function FailedToUpdateCards({ failedToUpdateVersions }: FailedToUpdateCardsProps) {
	const oracleIds = failedToUpdateVersions.map((version: Version) => version.oracleId);

	const searchResponse = useCollectionCardSearch({
		oracleId: oracleIds,
	});

	const mappedfailedCards = useMemo(() => {
		const map = new Map<string, CollectionCard>();
		if (searchResponse?.data?.length) {
			failedToUpdateVersions.forEach((failedVersion) => {
				for (let card of searchResponse.data) {
					let foundCard = false;
					for (let cardVersion of card.versions) {
						if (cardVersion.oracleId === failedVersion.oracleId) {
							map.set(cardVersion.oracleId, card);
							foundCard = true;
							break;
						}
					}
					if (foundCard) {
						break;
					}
				}
			});
		}
		return map;
	}, [searchResponse.data]);

	return (
		<>
			<QueryResult queryResult={searchResponse as QueryResultData}>
				<div className={style.wrapper}>
					<h3 className={style.infoText}>Unable to update the following cards:</h3>
					<ul>
						{failedToUpdateVersions.map((failedVersion) => {
							const card = mappedfailedCards.get(failedVersion.oracleId);
							const promoType = failedVersion?.promoTypes?.length
								? ` (${failedVersion?.promoTypes[0]})`
								: "";
							return (
								<li key={failedVersion.scryfallId}>
									<strong>{card?.name}</strong>
									<br />
									<span>
										<span>{`${failedVersion.set.toUpperCase()} #${
											failedVersion.collectionNumber
										}${promoType}`}</span>
									</span>
									<br />
								</li>
							);
						})}
					</ul>
					<p>Please try again later.</p>
				</div>
			</QueryResult>
		</>
	);
}
