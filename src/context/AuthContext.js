import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const history = useNavigate()
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsuscribe
  }, [])

  async function logout() {
    setError('')
    try {
      await auth.signOut()
    } catch (error) {
      console.log(error)
      setError('Failed to logout')
    }
  }
  const value = {
    currentUser,
    isLogged,
    setIsLogged,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
