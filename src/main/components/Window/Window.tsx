import interact from "interactjs"
import { ReactNode, useEffect, useRef, useState } from "react"

interface WindowProps {
  children?: ReactNode
  onClose: () => void
}

export default function Window({ children, onClose }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const titleBarRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)

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
          const x = position.x + event.dx
          const y = position.y + event.dy

          setPosition({ x, y })
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
          const target = event.target
          target.style.width = `${event.rect.width}px`
          target.style.height = `${event.rect.height}px`
        })
    }
  }, [position])

  return (
    <div
      ref={windowRef}
      style={{
        width: isMinimized ? "200px" : "200px",
        height: isMinimized ? "30px" : "200px",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
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
            onClick={() => setIsMinimized(!isMinimized)}
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
      {!isMinimized && children}
    </div>
  )
}
