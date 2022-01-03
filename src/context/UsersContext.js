import React, { createContext, useContext, useReducer } from 'react'

const UsersContext = createContext()

const initialState = {
  users: [],
  usersHasChanged: false,
  isLoading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_USERS':
      return { ...state, usersHasChanged: true }
    case 'LOAD_USERS':
      return {
        ...state,
        users: [...action.payload],
        usersHasChanged: false,
        isLoading: false,
      }
    case 'LOADING_USERS':
      return { ...state, isLoading: true }
    default:
      return state
  }
}

function UsersContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const UsersStates = {
    ...state,
    changeUsers: () => dispatch({ type: 'CHANGE_USERS' }),
    loadUsers: (data) => dispatch({ type: 'LOAD_USERS', payload: data }),
    loadingUsers: () => dispatch({ type: 'LOADING_USERS' }),
  }

  return (
    <UsersContext.Provider value={UsersStates}>
      {children}
    </UsersContext.Provider>
  )
}

function useUsers() {
  const context = useContext(UsersContext)
  return context
}

export { UsersContextProvider, useUsers }
