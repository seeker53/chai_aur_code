import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cards from './components/Cards'
import './App.css'

function App() {

    let myObj = {
      userName:'Dishant',
      age : 23
    }

    let myArr = [1,2,3]

  return (
    <>
    <h1 className='flex justify-center align-center text-semibold text-black bg-blue-300 mb-5 rounded-md'>Chai aur react</h1>
    <Cards userName='thisisdishant' btnText='click me'/>
    <Cards userName='Dishant' />
    </>
  )
}

export default App
