import interact from "interactjs"
import { useEffect, useRef } from "react"
import { useStores } from "../../stores/RootStore"
import { WindowState } from "../../stores/SpacesStore"

interface WindowProps {
  windowState: WindowState
  onClose: () => void
}

export default function Window({ windowState, onClose }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const titleBarRef = useRef<HTMLDivElement>(null)
  const { spacesStore } = useStores()

  useEffect(() => {
    if (windowRef.current && titleBarRef.current) {
      interact(windowRef.current)
        .draggable({
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: "parent",
              endOnly: true,
            }),
          ],
          autoScroll: true,
          onmove: (event) => {
            spacesStore.updateWindow({
              ...windowState,
              x: windowState.x + event.dx,
              y: windowState.y + event.dy,
            })
          },
        })
        .resizable({
          edges: { left: true, right: true, bottom: true, top: false },
          modifiers: [
            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 },
            }),
          ],
        })
        .on("resizemove", (event) => {
          spacesStore.updateWindow({
            ...windowState,
            width: event.rect.width,
            height: event.rect.height,
          })
        })
    }
  }, [windowState, spacesStore])

  return (
    <div
      ref={windowRef}
      style={{
        width: windowState.width,
        height: windowState.height,
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        left: `${windowState.x}px`,
        top: `${windowState.y}px`,
      }}
    >
      <div
        ref={titleBarRef}
        style={{
          backgroundColor: "lightgray",
          cursor: "move",
          padding: "5px",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Window</div>
        <div>
          <button
            onClick={() =>
              spacesStore.updateWindow({
                ...windowState,
                minimized: !windowState.minimized,
              })
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              marginRight: "5px",
            }}
          >
            _
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </div>
      </div>
      {!windowState.minimized && windowState.children}
    </div>
  )
}
