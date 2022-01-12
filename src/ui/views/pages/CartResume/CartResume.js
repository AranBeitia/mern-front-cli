import React from 'react'
import { getlocalStorage } from '../../../../utils/localStorage'
import { Button, Container, ListGroup, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'
// import CartItem from './CartItem'

export default function CartResume() {
  const { products, total } = useCart()
  const isLogged = getlocalStorage()

  return (
    <Container>
      <h2>You have {products.length} items in your shopping cart</h2>
      <ListGroup as="ol" numbered>
        {products.map((product) => {
          return (
            <ListGroup.Item
              key={product.id}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{product.title}</div>
                Cras justo odio
              </div>
              <Badge bg="dark" text="light">
                {product.price}€
              </Badge>
            </ListGroup.Item>
            // <CartItem
            //   key={product.id}
            //   title={product.title}
            //   price={product.price}
            // />
          )
        })}
      </ListGroup>
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
    </Container>
  )
}
