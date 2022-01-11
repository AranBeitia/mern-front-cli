import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/CartContext'
import CartItem from './CartItem'

export default function CartResume() {
  const { products, total } = useCart()
  const { isLogged } = useAuth()

  return (
    <>
      <h2>You are going to buy {products.length} items</h2>

      {products.map((product) => {
        return (
          <CartItem
            key={product.id}
            title={product.title}
            price={product.price}
          />
        )
      })}
      <div>Total: {total}€</div>
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
