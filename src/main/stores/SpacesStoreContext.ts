import { createContext } from "react"
import SpacesStore from "./SpacesStore"

const SpacesStoreContext = createContext<SpacesStore | null>(null)

export default SpacesStoreContext
