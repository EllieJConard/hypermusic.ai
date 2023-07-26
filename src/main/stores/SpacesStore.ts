import { makeAutoObservable } from "mobx"

export interface WindowState {
  position: { x: number; y: number }
  isMinimized: boolean
}

class SpacesStore {
  windows: Record<string, WindowState> = {}

  constructor() {
    makeAutoObservable(this)
  }

  addWindow(id: string, position: { x: number; y: number }) {
    this.windows[id] = { position, isMinimized: false }
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
