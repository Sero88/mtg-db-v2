import { SearchFields } from "@/types/search";
import axios from "axios";
import { useQuery } from "react-query";

export function useCollectionCardSearch(fields: SearchFields) {
	return useQuery(["collectionCardSearch", ...Object.values(fields)], async () => {
		if (!Object.values(fields)?.length) return null;

		const searchEndpoint = "/api/collection/search";
		const response = await axios.post(searchEndpoint, fields);

		return response?.data?.data;
	});
}
