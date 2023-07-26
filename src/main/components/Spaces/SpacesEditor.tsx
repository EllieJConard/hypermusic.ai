import styled from "@emotion/styled"
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

export default function SpacesEditor() {
  const { spacesStore } = useStores()

  const handleAddWindow = () => {
    spacesStore.addWindow({
      id: spacesStore.windows.length,
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      minimized: false,
    })
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
        {spacesStore.windows.map((windowState) => (
          <Window
            key={windowState.id}
            windowState={windowState}
            onClose={() => spacesStore.removeWindow(windowState.id)}
            onMinimize={() =>
              spacesStore.updateWindow({
                ...windowState,
                minimized: !windowState.minimized,
              })
            }
            onMove={(event) =>
              spacesStore.updateWindow({
                ...windowState,
                x: windowState.x + event.dx,
                y: windowState.y + event.dy,
              })
            }
            onResize={(event) =>
              spacesStore.updateWindow({
                ...windowState,
                width: event.rect.width,
                height: event.rect.height,
              })
            }
          />
        ))}
      </div>
    </div>
  )
}
