import { createContext } from "react";

export const SelectionQueryContext = createContext({
    fromLanguage: "",
    setFromLanguage: () => {},
    toLanguage: "",
    setToLanguage: () => {}
})