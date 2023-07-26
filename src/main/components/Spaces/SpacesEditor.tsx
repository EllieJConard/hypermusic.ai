import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { useStores } from "../../hooks/useStores"
import { Tab as NavigationTab } from "../Navigation/Navigation"
import Window from "../Window/Window"

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
  const { spacesStore } = useStores()

  const handleClose = (id: string) => {
    spacesStore.removeWindow(id)
  }

  const handleAddWindow = () => {
    spacesStore.addWindow()
  }

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
        {Array.from(spacesStore.windows.values()).map((window: WindowState) => (
          <Window
            key={window.id}
            window={window}
            onClose={() => handleClose(window.id)}
          />
        ))}
      </div>
    </div>
  )
})

export default SpacesEditor
