import { makeAutoObservable } from "mobx"

interface WindowState {
  id: number
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
}

class SpacesStore {
  windows: WindowState[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addWindow(window: WindowState) {
    this.windows.push(window)
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
