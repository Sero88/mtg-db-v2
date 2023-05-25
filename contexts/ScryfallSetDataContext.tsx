import { ScryfallSet } from "@/types/scryfall";
import { createContext } from "react";

export const ScryfallSetDataContext = createContext([] as ScryfallSet[]);
