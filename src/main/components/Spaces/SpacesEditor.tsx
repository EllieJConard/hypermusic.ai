import styled from "@emotion/styled"
import { observer } from "mobx-react-lite"
import { useStores } from "../../hooks/useStores" // Import the useStores hook
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
  // Wrap the component with observer
  const { spacesStore } = useStores() // Use the spacesStore

  const handleClose = (id: number) => {
    spacesStore.removeWindow(id) // Use the removeWindow method of spacesStore
  }

  const handleAddWindow = () => {
    const newWindow = {
      id: spacesStore.windows.length,
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      minimized: false,
    }
    spacesStore.addWindow(newWindow) // Use the addWindow method of spacesStore
  }

  return (
    <div>
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
        {spacesStore.windows.map(
          (
            window // Use the windows array of spacesStore
          ) => (
            <Window
              key={window.id}
              onClose={() => handleClose(window.id)}
              onMove={(x, y) => spacesStore.updateWindow({ ...window, x, y })}
              onResize={(width, height) =>
                spacesStore.updateWindow({ ...window, width, height })
              }
              onMinimize={() =>
                spacesStore.updateWindow({
                  ...window,
                  minimized: !window.minimized,
                })
              }
            />
          )
        )}
      </div>
    </div>
  )
})

export default SpacesEditor
