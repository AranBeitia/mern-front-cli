import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'
import { getlocalStorage } from '../../../../utils/localStorage'
import CartItem from './CartItem'

export default function CartResume() {
  const { products, total } = useCart()
  const isLogged = getlocalStorage()

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
          <Link to={'/step1'}>
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
