import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [reviews, setReviews] = useState({good: 0, bad: 0, neutral: 0})

  return (
    <div>
      <Header text={'give feedback'} />
      <ReviewButtons reviews={reviews} setReviews={setReviews} />
      <Header text={'statistics'} />
      <StatisticsDisplay reviews={reviews} />
    </div>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: "white", borderStyle: 'outset', borderWidth: '5px', borderColor: 'lightgray'}}>
      {text}
    </button>
  )
} 

const CenterWrapper = ({ children }) => <div style={{ display: 'flex', justifyContent: 'space-around' }}>{children}</div>

const ReviewButtons = ({ reviews, setReviews }) => {
  return (
      <CenterWrapper>
        <Button text="good" onClick={() => setReviews({ ...reviews, good: reviews.good + 1})}/>
        <Button text="neutral" onClick={() => setReviews({ ...reviews, neutral: reviews.neutral + 1 })}/>
        <Button text="bad" onClick={() => setReviews({ ...reviews, bad: reviews.bad + 1})} />
      </CenterWrapper>
  )
}

const StatisticsDisplay = ({ reviews }) => {
  return (
    <table>
      <ReviewCountDisplay reviews={reviews} />
      <CalculatedDisplay reviews={reviews} />
    </table>
  )
}

const ReviewCountDisplay = ({ reviews }) => {
  return (
    <tbody>
      <PairDisplay text="good" value={reviews.good} />
      <PairDisplay text="neutral" value={reviews.neutral} />
      <PairDisplay text="bad" value={reviews.bad} />
    </tbody>
  )

}

const CalculatedDisplay = ({ reviews }) => {
  const total = reviews.good + reviews.neutral + reviews.bad;  
  if (total == 0) return <CenterWrapper><p>No feedback given</p></CenterWrapper>
  
  const average = (reviews.good - reviews.bad) / total;
  const positive = (reviews.good / total) * 100;
  
  return (
    <tbody>
      <PairDisplay text="total" value={total} />
      <PairDisplay text="average" value={average} />
      <PairDisplay text="positive" value={positive + "%"}/>
    </tbody>
  )
}

const PairDisplay = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

export default App