import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)
  // const [clickCounter, setClickCounter] = useState(0)
  const [clicks, setClicks] = useState({ left: 0, right: 0, center: 0})
  const [trackedClicks, setTrackedClicks] = useState([])
  const [totalClicks, setTotalClicks] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )


  // NEVER MODIFY ELEMENTS IN PLACE ALWAYS USE SET
  // Updates are Async so to use updated values first store in a variable
  const increaseByOne = () => {
    setTrackedClicks(trackedClicks.concat('+'))
    const newClicks = clicks.center + 1;
    setClicks({ ...clicks, center: newClicks})
    setTotalClicks(newClicks + clicks.left + clicks.right)
  }

  const decreaseByOne = () => {
    setTrackedClicks(trackedClicks.concat('-'))
    const newClicks = clicks.center - 1;
    setClicks({ ...clicks, center: newClicks })
    setTotalClicks(clicks.left + newClicks + clicks.right)
  }

  const resetClickCounter = () => {
    setClicks({ left: 0, right: 0, center: 0 })
    setTrackedClicks([])
    setTotalClicks(0)
  }

  const handleLeftClick = () => {
    setTrackedClicks(trackedClicks.concat('L')) //  Concat returns copy of array
    const newClicks = clicks.left + 1
    setClicks({ ...clicks, left: newClicks })
    setTotalClicks(newClicks + clicks.center + clicks.right)
  }

  const handleRightClick = () => {
    setTrackedClicks(trackedClicks.concat('R'))
    const newClicks = clicks.right + 1
    setClicks({ ...clicks, right: newClicks })
    setTotalClicks(clicks.left + clicks.center + newClicks)
  }

  return (
    <div>
      <div>
        <CounterDisplay counter={counter} />
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#EBEBEB", color: "black", width: "100%"}}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#EBEBEB", color: "black", width: "100%" }}>
            <InlineWrapper>
              <CounterDisplay counter={clicks.left} />
              <Button onClick={handleLeftClick} text='left'></Button>
            </InlineWrapper>
            <InlineWrapper>
              <Button onClick={increaseByOne} text='add' />
              <InlineWrapper>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CounterDisplay counter={clicks.center} />
                </div>
                <div style={{ display: "center", width: "auto" }}>
                  <Button onClick={resetClickCounter} text='reset' />
                </div>

              </InlineWrapper>
              <Button onClick={decreaseByOne} text='subtract' />
            </InlineWrapper>
            <InlineWrapper>
              <Button onClick={handleRightClick} text='right'></Button>
              <CounterDisplay counter={clicks.right} />
            </InlineWrapper>
          </div>
          <ClickHistory pastClicks={trackedClicks} />
          <CounterDisplay counter={totalClicks} />
        </div>
      </div>
    </div>
  )
}

const InlineWrapper = ({ children }) => <div style={{ display: "inline-block", margin: "1vw", alignItems: "center", textAlign: "center"}}>{children}</div>

const CounterDisplay = ({ counter }) => <InlineWrapper><div style={{textAlign: "center"}}>{counter}</div></InlineWrapper>

const Button = ({ onClick, text }) => <InlineWrapper><button style={{ width: "12vw", overflow: 'hidden'}} onClick={onClick}>{text}</button></InlineWrapper>

const ClickHistory = (props) => {
  if (props.pastClicks.length === 0) {
    return (
      <div>click the buttons</div>
    )
  }

  return (
    <div>{props.pastClicks.join(' ')}</div>
  )
}

export default App