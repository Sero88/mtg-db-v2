import { useQuery } from "react-query";
import axios from "axios";
import { QuantityCardCollection } from "@/types/collection";

export function useGetCollectionCardQuantityById(ids: string[]) {
	const jsonCardIds = JSON.stringify(ids);

	return useQuery(["cardSearch", jsonCardIds], async () => {
		const searchEndpoint =
			"/api/collection/search/quantity-by-id?cardIds=" + JSON.stringify(ids);

		const response = await axios.get(searchEndpoint);

		return response?.data?.data as QuantityCardCollection[];
	});
}
