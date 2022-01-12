import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage } from '../utils/localStorage.js'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState('client')

  async function logout() {
    setError('')
    try {
      setRole('client')
      removeLocalStorage()
      await auth.signOut()
    } catch (error) {
      console.log(error)
      setError('Failed to logout')
    }
  }
  const value = {
    setCurrentUser,
    currentUser,
    isLogged,
    setIsLogged,
    logout,
    role,
    setRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
