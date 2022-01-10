import React, { createContext, useContext, useReducer, useEffect } from 'react'
import clientAxios from '../config/axios'

const ProductContext = createContext()

export const initialState = {
  products: [],
  hasChanged: false,
  isEditable: false,
  isLoading: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        hasChanged: false,
        products: [...action.payload],
      }
    default:
      return state
  }
}

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products, hasChanged } = state

  const consultAPI = async () => {
    const consultProducts = await clientAxios.get('/products')
    dispatch({ type: 'FETCH_SUCCESS', payload: consultProducts.data.data })

    if (!products) {
      dispatch({ type: 'FETCH_REQUEST' })
    }
  }

  useEffect(() => {
    consultAPI()
  }, [])

  useEffect(() => {
    if (hasChanged) {
      consultAPI()
      setHasChanged(false)
    }
  }, [hasChanged])

  const productStates = {
    ...state,
  }
  return (
    <ProductContext.Provider value={productStates}>
      {children}
    </ProductContext.Provider>
  )
}

function useProduct() {
  const context = useContext(ProductContext)
  if (!context) return null
  return context
}

export { ProductProvider, useProduct }
