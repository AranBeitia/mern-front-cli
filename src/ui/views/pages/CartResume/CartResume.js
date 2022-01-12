import React from 'react'
import { getlocalStorage } from '../../../../utils/localStorage'
import { Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'
import CartItem from './CartItem'

export default function CartResume() {
  const { products, total } = useCart()
  const isLogged = getlocalStorage()

  return (
    <Container className="py-3">
      <h2>You have {products.length} items in your shopping cart</h2>
      <ListGroup as="ol" numbered className="py-2">
        {products.map((product, index) => {
          return (
            <CartItem key={index} title={product.title} price={product.price} />
          )
        })}
      </ListGroup>
      <p className="text-end">
        <span className="fw-bold">Total:</span> {total}€
      </p>

      {isLogged ? (
        <Link to={'/step1'} className="btn btn-success">
          Checkout
        </Link>
      ) : (
        <>
          <Link to={'/login'} className="primary">
            Login
          </Link>
          <Link to={'/signup'} className="primary">
            Sign Up
          </Link>
        </>
      )}
    </Container>
  )
}
