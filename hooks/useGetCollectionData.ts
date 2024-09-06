import axios from "axios";
import { useQuery } from "react-query";

export function useGetCollectionData(endpoint: string, id: string) {
	return useQuery({
		queryKey: [id],
		queryFn: async () => {
			const response = await axios.get(endpoint);
			return response?.data?.data;
		},
	});
}
