import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import clientAxios from '../../../../config/axios'
import { useCart } from '../../../../context/CartContext'
import { usePurchase } from '../../../../context/PurchaseContext'
import Header from '../../components/Layout/Header'
import CartItem from '../CartResume/CartItem'

export default function Step3() {
  const { address, payment } = usePurchase()
  const { products, total } = useCart()

  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (isSubmit) {
      navigate('/step3')
    }
  }, [isSubmit])

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    // clientAxios.post('')
  }

  return (
    <>
      <Header />
      <main>
        <h1>3.Review info</h1>
        <p>Here the summary of the purchase</p>

        <h2>Address details</h2>
        <div className="mb-3">
          <h3>Address</h3>
          <p>{address.address}</p>

          <h3>Town</h3>
          <p>{address.town}</p>
        </div>
        <div className="mb-3">
          <h3>Address</h3>
          <p>{address.state}</p>

          <h3>Town</h3>
          <p>{address.postCode}</p>
        </div>
        <div className="mb-3">
          <h3>Address</h3>
          <p>{address.country}</p>
        </div>

        <h2>Credit card details</h2>

        <div className="mb-3">
          <h3>Credit card</h3>
          <p>{payment.card}</p>

          <h3>CVC</h3>
          <p>{payment.cvc}</p>
        </div>
        <div className="mb-3">
          <h3>Card number</h3>
          <p>{payment.cardNumber}</p>
        </div>

        <div className="mb-3">
          <h2>Cart items</h2>
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
        </div>

        <Link to={'/step2'}>
          <Button className="w-100" type="submit">
            Previous step
          </Button>
        </Link>

        <Button className="w-100" onClick={handleSubmit}>
          Next step
        </Button>
      </main>
    </>
  )
}
