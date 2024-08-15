import axios from "axios";
import { useQuery } from "react-query";

export function useGetCollectionWithVersions(lastUpdate: Date | undefined) {
	return useQuery({
		queryKey: ["collectionCards", lastUpdate],
		queryFn: async () => {
			const collectionEndpoint = "/api/collection";
			const response = await axios.get(collectionEndpoint);

			return response?.data?.data;
		},
		enabled: !!lastUpdate,
	});
}
