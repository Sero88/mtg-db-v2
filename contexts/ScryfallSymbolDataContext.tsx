import { ScryfallSymbol } from "@/types/scryfall";
import { createContext } from "react";

export const ScryfallSymbolDataContext = createContext([] as ScryfallSymbol[]);
