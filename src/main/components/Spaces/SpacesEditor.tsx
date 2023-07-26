import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { WindowState } from "../../stores/SpacesStore"
import { Tab as NavigationTab } from "../Navigation/Navigation"
import Window from "../Window/Window"

import { useContext } from "react"
import { SpacesStoreContext } from "../../stores/SpacesStoreContext"

const ButtonPanel = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.backgroundColor};
  height: 3rem;
  flex-shrink: 0;
`

const Tab = styled(NavigationTab)`
  cursor: pointer;
`

const SpacesEditor = observer(() => {
  const spacesStore = useContext(SpacesStoreContext)

  const handleClose = (id: string) => {
    spacesStore.removeWindow(id)
  }

  const handleAddWindow = () => {
    const id = Math.random().toString(36).substring(7) // generate a random id
    const position = { x: 0, y: 0 } // set initial position
    spacesStore.addWindow(id, position)
  }

  console.log(Object.values(spacesStore.windows))

  return (
    <div>
      <h1>Spaces</h1>
      <ButtonPanel>
        <Tab onClick={handleAddWindow}>Add Window</Tab>
      </ButtonPanel>
      <div
        style={{
          width: "1000px",
          height: "1000px",
          position: "relative",
        }}
      >
        {Object.values(spacesStore.windows).map((window: WindowState) => (
          <Window
            key={window.id}
            id={window.id}
            position={window.position}
            isMinimized={window.isMinimized}
            setPosition={spacesStore.setPosition}
            setIsMinimized={spacesStore.setIsMinimized}
            onClose={handleClose}
          >
            Window {window.id}
          </Window>
        ))}
      </div>
    </div>
  )
})

export default SpacesEditor
