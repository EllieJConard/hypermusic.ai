import interact from "interactjs"
import { ReactNode, useEffect, useRef } from "react"

interface WindowProps {
  children?: ReactNode
  onClose: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
  onMinimize: () => void
}

export default function Window({
  children,
  onClose,
  onMove,
  onResize,
  onMinimize,
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
        onmove: (event) => {
          onMove(event.dx, event.dy) // Call the onMove prop
        },
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
        .on("resizemove", (event) => {
          onResize(event.rect.width, event.rect.height) // Call the onResize prop
        })
    }
  }, [onMove, onResize])

  return (
    <div
      ref={windowRef}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
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
            onClick={onMinimize} // Call the onMinimize prop
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
      {children}
    </div>
  )
}
