import { useMutation } from "react-query";
import axios from "axios";
import { CollectionCardQuantity, CollectionCardQuantityTypeEnum } from "@/types/collection";
import { ScryfallCard } from "@/types/scryfall";

type UpdateCollectionQuantityArgs = {
	card: ScryfallCard;
	type: CollectionCardQuantityTypeEnum;
	newQuantity: number;
};
export function useUpdateCollectionCardQuantity() {
	return useMutation(
		["collectionCardUpdateQuantity"],
		async (updateCardObject: UpdateCollectionQuantityArgs) => {
			const updateEndpoint = "/api/collection/update/quantity";

			const response = await axios.patch(updateEndpoint, {
				...updateCardObject,
			});

			return response?.data?.data;
		}
	);
}
