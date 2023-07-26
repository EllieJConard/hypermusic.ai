import { makeAutoObservable } from "mobx"

export type WindowState = {
  id: string
  position: { x: number; y: number }
  isMinimized: boolean
}

class SpacesStore {
  windows: Record<string, WindowState> = {}

  constructor() {
    makeAutoObservable(this)
  }

  addWindow(id: string, position: { x: number; y: number }) {
    this.windows[id] = { id, position, isMinimized: false } // Add id here
  }

  removeWindow(id: string) {
    delete this.windows[id]
  }

  setPosition(id: string, position: { x: number; y: number }) {
    if (this.windows[id]) {
      this.windows[id].position = position
    }
  }

  setIsMinimized(id: string, isMinimized: boolean) {
    if (this.windows[id]) {
      this.windows[id].isMinimized = isMinimized
    }
  }
}

export default SpacesStore
