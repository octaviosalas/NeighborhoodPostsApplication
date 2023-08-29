import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Main from './pages/Main'
import Wall from './pages/Wall'

function App() {
  

  return (
    <>
      <Navbar/>

              <Routes>
                 <Route path="/" element={<SignIn/>}></Route> 
                 <Route path="/register" element={<Register/>}></Route> 
                 <Route path="/main" element={<Main/>}></Route> 
                 <Route path="/wall" element={<Wall/>}></Route> 
              </Routes>
    </>
  )
}

export default App
