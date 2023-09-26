import { SearchQueryFields } from "@/types/search";
import axios from "axios";
import { useQuery } from "react-query";

export function useCollectionCardSearch(fields: SearchQueryFields) {
	const fieldValues = Object.values(fields);
	const { isLoading, refetch, data, error, isSuccess } = useQuery(
		["collectionCardSearch", ...fieldValues],
		async () => {
			const searchEndpoint = "/api/collection/search";

			const response = await axios.post(searchEndpoint, fields);

			return response?.data?.data;
		},
		{
			enabled: false,
		}
	);

	return { isLoading, refetch, data, error, isSuccess };
}
