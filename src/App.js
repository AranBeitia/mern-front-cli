import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import SignUp from './ui/views/pages/SignUp'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
