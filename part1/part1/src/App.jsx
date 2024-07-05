const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hi {props.name} | {props.age == undefined ? "No Age" : "Age is " + props.age}</p>
    </div>
  )
}

const App = () => {
  console.log("HI")
  // const now = new Date()
  // const a = 10, b = 20
  const name = "Dan"
  const age = 20
  // console.log(a + b, now, a, "A%d", a)
  // console.log("A = %d", a, "b = %d", b)
  return (
    <div>
      <p>Hello</p>
      <Hello name="Joe" age={5} />
      <Hello name="John" />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App