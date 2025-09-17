import { useState, useContext } from 'react'
import './App.css'
import TransactionsOverview from './pages/TransactionsOverview'
import Navbar from './components/Navbar'
import { ThemeContext } from './context/ThemeContext'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import TransactionsBySchool from './pages/TransactionsBySchool'


function App() {
  const {theme} = useContext(ThemeContext)
  // console.log(theme[0])
  return (
    <div data-theme={theme[0]}>
      <div className="min-h-screen  flex flex-col  items-center justify-center bg-base-200 relative ">
        {/* <h1 className="text-3xl font-bold">🚀 DaisyUI + Tailwind v4</h1> */}
        <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/transactions' element={<TransactionsOverview />} />
          <Route path='/' element={<TransactionsOverview />} />
          <Route path='/transactions/school/:schoolId' element={<TransactionsBySchool />} />
        </Routes>
        <Toaster/>
        {/* <button className="btn btn-primary mt-4">Primary Button</button> */}

        {/* <div className="loading loading-spinner loading-lg mt-4">loader</div> */}
      </div>
    </div>
  )
}

export default App
