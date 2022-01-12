import { useEffect, useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { usePurchase } from '../../../../context/PurchaseContext'
import FormButtons from '../../components/FormButtons/FormButtons'
import Header from '../../components/Layout/Header'

export default function Step1() {
  const navigate = useNavigate()
  const { adressSubmit, address } = usePurchase()
  const { currentUser } = useAuth()

  const [isSubmit, setSubmit] = useState(false)

  const [addressForm, setAddress] = useState('')
  const [townForm, setTown] = useState('')
  const [stateForm, setState] = useState('')
  const [postCodeForm, setPostCode] = useState('')
  const [countryForm, setCountry] = useState('')

  useEffect(() => {
    if (address.address) {
      setAddress(address.address)
    }
    if (address.town) {
      setTown(address.town)
    }
    if (address.state) {
      setState(address.state)
    }
    if (address.postCode) {
      setPostCode(address.postCode)
    }
    if (address.country) {
      setCountry(address.country)
    }
  }, [])

  useEffect(() => {
    if (isSubmit) {
      navigate('/step2')
    }
  }, [isSubmit])

  const changeAddress = (e) => {
    setAddress(e.target.value)
  }

  const changeTown = (e) => {
    setTown(e.target.value)
  }

  const changeState = (e) => {
    setState(e.target.value)
  }

  const changePostCode = (e) => {
    setPostCode(e.target.value)
  }

  const changeCountry = (e) => {
    setCountry(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    const values = {
      address: addressForm,
      country: countryForm,
      postCode: postCodeForm,
      state: stateForm,
      town: townForm,
    }

    adressSubmit(values)
    setSubmit(true)

    console.log(currentUser)
  }
  return (
    <div>
      <Header />
      <Container>
        <h1>Purchase</h1>

        <Form onSubmit={handleSubmit}>
          <h1>1.User address and shipping details</h1>
          <Form.Group id="address">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={addressForm}
              onChange={changeAddress}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="town">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              name="town"
              value={townForm}
              onChange={changeTown}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={stateForm}
              onChange={changeState}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="postCode">
            <Form.Label>PostCode</Form.Label>
            <Form.Control
              type="text"
              name="postCode"
              value={postCodeForm}
              onChange={changePostCode}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={countryForm}
              onChange={changeCountry}
              required
            ></Form.Control>
          </Form.Group>
          <Button className="w-100" type="submit">
            Next step
          </Button>
        </Form>
      </Container>
    </div>
  )
}
