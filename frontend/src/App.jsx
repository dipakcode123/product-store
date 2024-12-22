import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [color, setBgColor] = useState("bg-gray-900");


  return (
    <div className={`min-h-screen overflow-hidden ${color} ${color === "bg-gray-900"?"text-white":"text-black"}`}>      
    <ToastContainer />
      <Navbar color={color} setBgColor={setBgColor}/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage color={color} />} />
      </Routes>
    </div>
  )
}

export default App
