import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [counter,setCounter] = useState(0)

  const addValue = ()=>{
    console.log("clicked",counter)
    // if(counter === 20)  alert('Value cannot be increased further')
    // else  counter = counter + 1
    setCounter((prevCounter)=>prevCounter+1)
    setCounter((prevCounter)=>prevCounter+1)
    // setCounter(counter+1)
    // setCounter(counter+1)
  }

  const decreaseValue = ()=>{
    console.log("clicked",counter)
    if(counter === 0) alert('Value cannot be decreased further')
    else counter = counter - 1
    setCounter(counter)
  }
  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={decreaseValue}>Decrease value {counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App
