import { Version } from "@/types/collection";
import { createContext } from "react";

export const CollectionVersionsContext = createContext([] as Version[]);
