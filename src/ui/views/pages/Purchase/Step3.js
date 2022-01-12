import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import clientAxios from '../../../../config/axios'
import { useCart } from '../../../../context/CartContext'
import { usePurchase } from '../../../../context/PurchaseContext'
import { getlocalStorage } from '../../../../utils/localStorage'
import Header from '../../components/Layout/Header'
import CartItem from '../CartResume/CartItem'

export default function Step3() {
  const navigate = useNavigate()
  const { address, payment } = usePurchase()
  const { products, total } = useCart()
  const currentUser = getlocalStorage()

  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (isSubmit) {
      navigate('/step4')
    }
  }, [isSubmit])

  async function submitData() {
    const userAddress = {
      address: address.address,
      country: address.country,
      postCode: address.postCode,
      state: address.state,
      town: address.town,
    }

    const userPayment = {
      cardNumber: payment.cardNumber,
      cvc: payment.cvc,
      card: payment.card,
    }

    const cart = {
      products: products,
    }

    clientAxios
      .post(
        '/orders',
        { userAddress, userPayment, cart },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => setSubmit(true))
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    submitData()
  }

  return (
    <>
      <Header />
      <Container className="py-3">
        <h2>3.Review info</h2>
        <h3>The summary of your purchase</h3>
        <div className="d-flex justify-content-between">
          <div>
            <h4>Address details</h4>
            <div className="mb-3">
              <p>
                <span className="fw-bold">Address: </span> {address.address}
              </p>
              <p>
                <span className="fw-bold">City: </span>
                {address.town}
              </p>
            </div>
            <div className="mb-3">
              <p>
                <span className="fw-bold">State: </span>
                {address.state}
              </p>
              <p>
                <span className="fw-bold">Post code: </span>
                {address.postCode}
              </p>
            </div>
            <div className="mb-3">
              <p>
                <span className="fw-bold">Country: </span>
                {address.country}
              </p>
            </div>

            <h4>Credit card details</h4>
            <div className="mb-3">
              <p>
                <span className="fw-bold">Card: </span>
                {payment.card}
              </p>

              <p>
                <span className="fw-bold">CVC: </span>
                {payment.cvc}
              </p>
            </div>
            <div className="mb-3">
              <p>
                <span className="fw-bold">Card number: </span>
                {payment.cardNumber}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <h2>Cart items</h2>
            {products.map((product, index) => {
              return (
                <CartItem
                  key={index}
                  title={product.title}
                  price={product.price}
                />
              )
            })}
            <p className="pt-3">
              <span className="fw-bold">Total: </span>
              {total}€
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Link to={'/step2'} className="btn btn-primary">
            Prev
          </Link>

          <Button variant="primary" onClick={handleSubmit}>
            Next
          </Button>
        </div>
      </Container>
    </>
  )
}
