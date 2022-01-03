import React, { createContext, useContext, useReducer } from 'react'

const UsersContext = createContext()

const initialState = {
  users: [],
  usersHasChanged: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_USERS':
      return { ...state, usersHasChanged: true }
    case 'LOAD_USERS':
      return { ...state, users: [...action.payload], usersHasChanged: false }
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
