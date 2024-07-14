import { Helpers } from "@/utils/helpers";
import axios from "axios";

export async function fetchCollection() {
	try {
		const results = await axios.get("/api/collection/");
		return Helpers.apiResponse(true, results?.data?.data);
	} catch (e: any) {
		return Helpers.apiResponse(false, null);
	}
}
