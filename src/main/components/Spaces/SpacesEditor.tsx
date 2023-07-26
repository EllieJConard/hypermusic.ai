import styled from "@emotion/styled"
import { useState } from "react"
import { Tab as NavigationTab } from "../Navigation/Navigation"
import Window from "../Window/Window"

const ButtonPanel = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.backgroundColor};
  height: 3rem;
  flex-shrink: 0;
`

const Tab = styled(NavigationTab)`
  cursor: pointer;
`

export default function SpacesEditor() {
  const [windows, setWindows] = useState<number[]>([])

  const handleClose = (index: number) => {
    setWindows(windows.filter((_, i) => i !== index))
  }

  const handleAddWindow = () => {
    setWindows([...windows, windows.length])
  }

  return (
    <div>
      <h1>Spaces</h1>
      <ButtonPanel>
        <Tab onClick={handleAddWindow}>Add Window</Tab>
      </ButtonPanel>
      <div
        style={{
          width: "1000px",
          height: "1000px",
          position: "relative",
        }}
      >
        {windows.map((_, index) => (
          <Window key={index} onClose={() => handleClose(index)} />
        ))}
      </div>
    </div>
  )
}
