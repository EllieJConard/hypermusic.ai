import { createContext } from "react"
import SpacesStore from "./SpacesStore"

export const SpacesStoreContext = createContext<SpacesStore | null>(null)
