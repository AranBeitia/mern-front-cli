import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/CartContext'

export default function CartResume() {
  const { products } = useCart()
  const { isLogged } = useAuth()

  return (
    <>
      <h2>You are going to buy {products.length} items</h2>
      {products.map((product) => {
        return <div>{product}</div>
      })}
      <div>
        {isLogged ? (
          <Button variant="success">Checkout</Button>
        ) : (
          <>
            <Link to={'/login'}>
              <Button variant="primary">Login</Button>
            </Link>
            <Link to={'/signup'}>
              <Button variant="primary">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </>
  )
}
