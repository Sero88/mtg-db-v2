import { Helpers } from "@/utils/helpers";
import axios from "axios";

export async function fetchCollection(path: string) {
	try {
		const results = await axios.get(path);
		return Helpers.apiResponse(true, results?.data?.data);
	} catch (e: any) {
		return Helpers.apiResponse(false, null);
	}
}
