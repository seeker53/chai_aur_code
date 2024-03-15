import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setCounter] = useState(0)

  const addValue = ()=>{
    console.log("clicked",counter)
    if(counter === 20)  alert('so yeah Value cannot be increased further')
    else  counter = counter + 1
    setCounter(counter)
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
