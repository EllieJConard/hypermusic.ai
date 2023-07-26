import { makeAutoObservable } from "mobx"

export interface WindowState {
  id: number
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
}

class SpacesStore {
  windows: WindowState[] = []
  nextWindowId = 0

  constructor() {
    makeAutoObservable(this)
  }

  addWindow(window: Omit<WindowState, "id">) {
    this.windows.push({ ...window, id: this.nextWindowId++ })
  }

  removeWindow(id: number) {
    this.windows = this.windows.filter((window) => window.id !== id)
  }

  updateWindow(updatedWindow: WindowState) {
    const index = this.windows.findIndex(
      (window) => window.id === updatedWindow.id
    )
    if (index !== -1) {
      this.windows[index] = updatedWindow
    }
  }
}

export default SpacesStore
