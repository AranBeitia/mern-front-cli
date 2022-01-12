import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'
import { usePurchase } from '../../../../context/PurchaseContext'
import CartItem from '../CartResume/CartItem'

export default function Step4(props) {
  const { address, payment } = usePurchase()
  const { products, total, orderDone } = useCart()

  return (
    <Container className="py-3">
      <h2>Purchase confirmation</h2>
      <div className="d-flex justify-content-between">
        <div>
          <p>
            <span className="fw-bold">Address: </span>
            {address.address}
          </p>

          <p>
            <span className="fw-bold">Postal code: </span>
            {address.postCode}
          </p>
          <p>
            <span className="fw-bold">Country: </span>
            {address.country}
          </p>
          <p>
            <span className="fw-bold">State: </span>
            {address.state}
          </p>
          <p>
            <span className="fw-bold">City: </span>
            {address.town}
          </p>
          <p>
            <span className="fw-bold">Address: </span>
            {address.address}
          </p>
        </div>

        <div>
          <p>
            <span className="fw-bold">Payment card number: </span>
            {payment.cardNumber}
          </p>
          <p>
            <span className="fw-bold">Payment CVC: </span>
            {payment.cvc}
          </p>
          <p>
            <span className="fw-bold">Payment card: </span>
            {payment.card}
          </p>
        </div>
      </div>
      <div>
        <h3>Products</h3>
        {products.map((product, index) => {
          return (
            <CartItem key={index} title={product.title} price={product.price} />
          )
        })}
      </div>
      <p className="my-2">
        <span className="fw-bold">Total amount: </span>
        {total}€
      </p>

      <Button
        variant="primary"
        onClick={() => location.assign('http://localhost:3000/')}
      >
        Go home
      </Button>
    </Container>
  )
}
