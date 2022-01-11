import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'

export default function CartResume() {
  const { products } = useCart()
  const isLogged = getlocalStorage()

  return (
    <>
      <h2>You are going to buy {products.length} items</h2>
      {products.map((product) => {
        return <div>{product}</div>
      })}
      <div>
        {isLogged ? (
          <Link to={'/purchase'}>
          <Button variant="success">Checkout</Button>
          </Link>
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
