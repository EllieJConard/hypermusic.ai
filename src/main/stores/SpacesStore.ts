export type WindowState = {
  id: string
  position: { x: number; y: number }
  isMinimized: boolean
}

class SpacesStore {
  windows: Record<string, WindowState> = {}

  constructor() {
    console.log("SpacesStore created")
  }

  addWindow(id: string, position: { x: number; y: number }) {
    console.log("Adding window:", id)
    this.windows[id] = { id, position, isMinimized: false }
  }

  removeWindow(id: string) {
    delete this.windows[id]
  }

  setPosition(id: string, position: { x: number; y: number }) {
    console.log("Setting position for window:", id)
    console.log("Current windows:", this.windows)
    this.windows[id].position = position
  }

  setIsMinimized(id: string, isMinimized: boolean) {
    if (this.windows[id]) {
      this.windows[id].isMinimized = isMinimized
    }
  }
}

export default SpacesStore
