"use client";
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { QueryResult } from "../utils/QueryResult";
import { useMemo } from "react";
import { CollectionCardFace } from "@/types/collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

export default function DailyFlavorText() {
	const collectionData = useGetCollectionData(
		"/api/collection/flavor-text",
		"flavorTextHomepage"
	);

	const flavorTextData = useMemo(() => {
		if (!collectionData.isSuccess) {
			return {};
		}

		const cardName = collectionData.data?.name;
		const cardFaces = collectionData.data.cardFaces as CollectionCardFace[];
		const flavorTexts: string[] = [];
		cardFaces.forEach((face) => {
			if (face.flavorText) {
				flavorTexts.push(face.flavorText);
			}
		});

		return {
			cardName,
			flavorText: flavorTexts[Math.floor(Math.random() * flavorTexts.length)],
		};
	}, [collectionData.isSuccess]);

	return (
		<QueryResult
			queryResult={{
				isLoading: collectionData.isLoading,
				error: collectionData.isError,
				data: collectionData.data,
			}}
		>
			<div>
				<p>
					<FontAwesomeIcon icon={faQuoteLeft} />
					<span>{flavorTextData.flavorText}</span>
					<FontAwesomeIcon icon={faQuoteRight} />
				</p>
				<p>Card: {flavorTextData.cardName}</p>
			</div>
		</QueryResult>
	);
}
