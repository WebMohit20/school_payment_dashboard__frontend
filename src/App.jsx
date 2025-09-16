import { useState, useContext } from 'react'
import './App.css'
import TransactionsOverview from './dashboardPages/TransactionsOverview'
import Navbar from './components/Navbar'
import { ThemeContext } from './context/ThemeContext'


function App() {
  const [theme] = useContext(ThemeContext)
  return (
    <div data-theme={theme}>
      <div className="min-h-screen flex flex-col  items-center justify-center bg-base-100 ">
        {/* <h1 className="text-3xl font-bold">🚀 DaisyUI + Tailwind v4</h1> */}
        <Navbar />
        <TransactionsOverview />
        {/* <button className="btn btn-primary mt-4">Primary Button</button> */}

        {/* <div className="loading loading-spinner loading-lg mt-4">loader</div> */}
      </div>
    </div>
  )
}

export default App
