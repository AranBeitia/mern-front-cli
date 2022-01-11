import { createContext, useContext, useReducer } from 'react'

const PurchaseContext = createContext()

const initialState = {
  currentStep: 0,
  address: {
    address: '',
    country: '',
    postCode: '',
    state: '',
    town: '',
  },
  payment: {
    cardNumber: '',
    cvc: '',
    card: '',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_STEP':
      return { ...state, currentStep: action.payload }
    case 'ADDRESS_SUBMIT':
      return { ...state, address: action.payload }
    case 'PAYMENT_SUBMIT':
      return { ...state, payment: action.payload }
    default:
      return state
  }
}

function PurchaseContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const PurchaseStates = {
    ...state,
    changeStep: (step) => dispatch({ type: 'CHANGE_STEP', payload: step }),
    adressSubmit: (data) => dispatch({ type: 'ADDRESS_SUBMIT', payload: data }),
    paymentSubmit: (data) =>
      dispatch({ type: 'PAYMENT_SUBMIT', payload: data }),
  }
  return (
    <PurchaseContext.Provider value={PurchaseStates}>
      {children}
    </PurchaseContext.Provider>
  )
}

function usePurchase() {
  const context = useContext(PurchaseContext)
  return context
}

export { PurchaseContextProvider, usePurchase }
