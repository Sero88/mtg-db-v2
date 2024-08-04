import { useQuery } from "react-query";
import axios from "axios";

export function useGetSets() {
	return useQuery("getSets", async () => {
		const endpoint = "https://api.scryfall.com/sets";
		const response = await axios.get(endpoint);
		return response?.data?.data;
	});
}
