
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'
import Navbar from './components/Navbar.jsx'
import { Navigate } from 'react-router-dom'


const App = () => {
  const{user} = useAuthContext()
  return (
    <div>
    <Navbar/>
    <Routes>
      
      <Route  path='/' element={user?<Home/>: <Navigate to="login"/>}/>
      <Route  path='/login' element={!user?<Login/>: <Navigate to="/"/>}/>
      <Route  path='/register' element={!user?<Register/>: <Navigate to="/"/>}/>
    </Routes>
    </div>
  )
}

export default App