import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../../../context/CartContext'
import { usePurchase } from '../../../../context/PurchaseContext'

export default function Step4(props) {
  const { address, payment } = usePurchase()
  const { products, total, orderDone } = useCart()

  return (
    <>
      <h2>Purchase confirmation</h2>
      <div>
        <h3>Address</h3>
        <h4>User address</h4>
        <p>{address.address}</p>
        <h4>User postCode</h4>
        <p>{address.postCode}</p>
        <h4>User country</h4>
        <p>{address.country}</p>
        <h4>User state</h4>
        <p>{address.state}</p>
        <h4>User town</h4>
        <p>{address.town}</p>
        <h4>User address</h4>
        <p>{address.address}</p>
      </div>
      <div>
        <h3>Payment</h3>
        <h4>Payment card number</h4>
        <p>{payment.cardNumber}</p>
        <h4>Payment CVC</h4>
        <p>{payment.cvc}</p>
        <h4>Payment card</h4>
        <p>{payment.card}</p>
      </div>
      <div>
        <h3>Products</h3>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.title}</p>
              <p>{product.price}€</p>
            </div>
          )
        })}
      </div>
      <div>Total amount: {total}€</div>

      <Button
        className="w-100"
        onClick={() => location.assign('http://localhost:3000/')}
      >
        Go home
      </Button>
    </>
  )
}
