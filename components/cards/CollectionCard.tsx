import { CollectionCard } from "@/types/collection";

type CollectionCardProps = {
	data: CollectionCard;
};

export function CollectionCard({ data }: CollectionCardProps) {
	return <p>{data?.name}</p>;
}
