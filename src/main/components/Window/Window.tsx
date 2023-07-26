import interact from "interactjs"
import { useEffect, useRef } from "react"
import { WindowState } from "../../stores/SpacesStore"

interface WindowProps {
  windowState: WindowState
  children?: ReactNode
  onClose: () => void
  onMinimize: () => void
  onMove: (event: Interact.InteractEvent) => void
  onResize: (event: Interact.InteractEvent) => void
}

export default function Window({
  windowState,
  children,
  onClose,
  onMinimize,
  onMove,
  onResize,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const titleBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (windowRef.current && titleBarRef.current) {
      interact(titleBarRef.current).draggable({
        inertia: false,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
        autoScroll: true,
        onmove: onMove,
      })

      interact(windowRef.current)
        .resizable({
          edges: { left: true, right: true, bottom: true, top: false },
          modifiers: [
            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 },
            }),
          ],
        })
        .on("resizemove", onResize)
    }
  }, [onMove, onResize])

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
            onClick={onMinimize}
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
      {!windowState.minimized && children}
    </div>
  )
}
