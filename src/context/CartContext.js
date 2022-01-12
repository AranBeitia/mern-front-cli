import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

function calculateTotal(products) {
  let totalAmount = 0.0
  products.forEach((element) => {
    totalAmount += parseFloat(element.price)
  })
  return totalAmount
}

const initialState = {
  products: [],
  resume: false,
  total: 0.0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: action.payload,
        total: calculateTotal(action.payload),
      }
    case 'RESUME_CART':
      return { ...state, resume: true }
    case 'ORDER_DONE':
      return { ...state, resume: false, products: [] }
    default:
      return state
  }
}

function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const CartStates = {
    ...state,
    addToCart: (data) => dispatch({ type: 'ADD_TO_CART', payload: data }),

    resumeCart: () => dispatch({ type: 'RESUME_CART' }),
    orderDone: () => dispatch({ type: 'ORDER_DONE' }),
  }

  return (
    <CartContext.Provider value={CartStates}>{children}</CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  return context
}

export { CartContextProvider, useCart }
