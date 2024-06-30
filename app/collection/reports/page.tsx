"use client";
import { useContext } from "react";

import { CollectionVersionsContext } from "@/contexts/CollectionVersionsContext";

export default function SearchPage() {
	const versions = useContext(CollectionVersionsContext);

	//todo remove after testing 👇
	console.log("versions ==>", versions);
	//todo remove after testing 👆
	return (
		<>
			<h1>Collection Reports</h1>
		</>
	);
}
