import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import Product from '../Product/Product'
import IntranetLogin from '../IntranetLogin/IntranetLogin'

export default function PrivateRouter({ children, ...rest }) {
  const { currentUser } = useAuth()
  let authorized = false
  if (currentUser) {
    authorized = currentUser.email.includes('luna')
    console.log(currentUser)
  } else {
    authorized = false
  }
  //const authorized = currentUser.email.includes('luna')
  return authorized ? <Product /> : <IntranetLogin />
}
