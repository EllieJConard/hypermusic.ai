import { observer } from "mobx-react-lite"
import { useStores } from "../../hooks/useStores"
import { WindowState } from "../../stores/SpacesStore"
import Window from "../Window/Window"

const SpacesEditor = observer(() => {
  const { spacesStore } = useStores()

  const handleClose = (id: string) => {
    spacesStore.removeWindow(id)
  }

  const handleAddWindow = () => {
    const id = Math.random().toString(36).substring(7) // generate a random id
    const position = { x: 0, y: 0 } // set initial position
    spacesStore.addWindow(id, position)
  }

  return (
    <div>
      <h1>Spaces</h1>
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
      <button onClick={handleAddWindow}>Add Window</button>
    </div>
  )
})

export default SpacesEditor
