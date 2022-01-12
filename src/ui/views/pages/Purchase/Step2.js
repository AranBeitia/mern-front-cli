import { useEffect, useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { usePurchase } from '../../../../context/PurchaseContext'
import Header from '../../components/Layout/Header'

export default function Step2() {
  const navigate = useNavigate()
  const { paymentSubmit, payment } = usePurchase()
  const { currentUser } = useAuth()

  const [cardNumberForm, setCardNumber] = useState('')
  const [cardForm, setCard] = useState('')
  const [cvcForm, setCvc] = useState('')

  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (payment.cardNumber) {
      setCardNumber(payment.cardNumber)
    }
    if (payment.cvc) {
      setCard(payment.cvc)
    }
    if (payment.card) {
      setCvc(payment.card)
    }
  }, [])

  useEffect(() => {
    if (isSubmit) {
      navigate('/step3')
    }
  }, [isSubmit])

  const changeCardNumber = (e) => {
    setCardNumber(e.target.value)
  }

  const changeCard = (e) => {
    setCard(e.target.value)
  }

  const changeCvc = (e) => {
    setCvc(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    const values = {
      cardNumber: cardNumberForm,
      cvc: cvcForm,
      card: cardForm,
    }

    paymentSubmit(values)
    setSubmit(true)
  }
  return (
    <>
      <Header />
      <Container className="py-3">
        <Form onSubmit={handleSubmit}>
          <h2> 2.Payment info</h2>
          <Form.Group id="card">
            <Form.Label>Card Holder Fullname</Form.Label>
            <Form.Control
              type="text"
              name="card"
              value={cardForm}
              onChange={changeCard}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="cvc">
            <Form.Label>CVC</Form.Label>
            <Form.Control
              type="text"
              name="cvc"
              value={cvcForm}
              onChange={changeCvc}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cardNumber"
              value={cardNumberForm}
              onChange={changeCardNumber}
              required
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-between mt-2">
            <Link to={'/step1'} className="btn btn-primary">
              Prev
            </Link>
            <Button className="btn btn-primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}
