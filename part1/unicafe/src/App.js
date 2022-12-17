import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  }

  return (
    // <div>
    //   <StatisticLine text="good" value={props.good} />
    //   <StatisticLine text="neutral" value={props.neutral} />
    //   <StatisticLine text="bad" value={props.bad} />
    //   <StatisticLine text="all" value={props.all} />
    //   <StatisticLine text="average" value={(props.good - props.bad)/props.all} />
    //   <StatisticLine text="positive" value={props.good / props.all * 100 + " %"} />
    // </div>
    <table>
      <tr>
        <td>good</td>
        <td>{props.good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{props.neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{props.bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{props.all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(props.good - props.bad)/props.all}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{props.good / props.all * 100 + " %"}</td>
      </tr>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good + bad + neutral} />
    </div>
  )
}

export default App
