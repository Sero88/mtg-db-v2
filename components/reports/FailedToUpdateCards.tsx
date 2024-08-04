import { useCollectionCardSearch } from "@/hooks/useCollectionCardSearch";
import { CollectionCard, Version } from "@/types/collection";
import { QueryResult } from "../utils/QueryResult";
import { QueryResultData } from "@/types/queryResult";
import { useMemo } from "react";
import style from "@/styles/failedToUpdateCards.module.scss";
import { SetUtil } from "@/utils/setUtil";
import { useGetSets } from "@/hooks/useGetSets";

type FailedToUpdateCardsProps = {
	failedToUpdateVersions: Version[];
};
export function FailedToUpdateCards({ failedToUpdateVersions }: FailedToUpdateCardsProps) {
	const oracleIds = failedToUpdateVersions.map((version: Version) => version.oracleId);
	const sets = useGetSets();
	const collectionCards = useCollectionCardSearch({
		oracleId: oracleIds,
	});

	const isLoading = sets.isLoading || collectionCards.isLoading;
	const error = sets.error || collectionCards.error;
	const hasData = sets?.data?.length && collectionCards?.data?.length;

	const mappedfailedCards = useMemo(() => {
		const map = new Map<string, CollectionCard>();
		if (collectionCards?.data?.length) {
			failedToUpdateVersions.forEach((failedVersion) => {
				for (let card of collectionCards.data) {
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
	}, [collectionCards.data]);

	return (
		<>
			<QueryResult
				queryResult={
					{
						error,
						data: hasData,
						isLoading,
					} as QueryResultData
				}
				errorMessage="Something went wrong while updating prices. Not all cards were updated."
			>
				{hasData && (
					<div className={style.wrapper}>
						<h3 className={style.infoText}>Unable to update the following cards:</h3>
						<ul>
							{failedToUpdateVersions.map((failedVersion) => {
								const card = mappedfailedCards.get(failedVersion.oracleId);
								const setData = SetUtil.getScryfallSetWithCollectionSetCode(
									sets?.data,
									failedVersion.set
								);

								const promoType = failedVersion?.promoTypes?.length
									? ` (${failedVersion?.promoTypes[0]})`
									: "";
								return (
									<li key={failedVersion.scryfallId}>
										<strong>{card?.name}</strong>
										<br />
										<span>
											<span>{`${
												setData?.name || ""
											} ${failedVersion.set.toUpperCase()} #${
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
				)}
			</QueryResult>
		</>
	);
}
