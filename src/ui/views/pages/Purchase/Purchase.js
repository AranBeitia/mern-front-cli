import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Header from '../../components/Layout/Header'
import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'



export default function Purchase() {
    const history = useNavigate()
    const { currentUser } = useAuth()
    const [address, setAddress] = useState('')
    const [town, setTown] = useState('')
    const [state, setState] = useState('')
    const [postCode, setPostCode] = useState('')
    const [country, setCountry] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [card, setCard] = useState('')
    const [cvc, setCvc] = useState('')

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

    const changeCardNumber = (e) => {
        setCardNumber(e.target.value)
    }

    const changeCard = (e) => {
        setCard(e.target.value)
    }

    const changeCvc = (e) => {
        setCvc(e.target.value)
    }

    const [step, setStep] = useState(1)

    let prevDisabled = false
    let nextDisabled = false

    if (step === 1) {
        prevDisabled = true
    }
    if (step === 4) {
        nextDisabled = true
    }

    function handleSubmit(e) {
        
        e.preventDefault()
        e.stopPropagation()
        

        //STEP 1 and 2 to database by patch find user by email in:
        
        
        //STEP get from localStorage product data set the billing data to database by patch
        //! currentUser._uid
        
        const values = {
            address: address,
            country: country,
            postCode: postCode,
            state: state,
            town: town,
            cardNumber: cardNumber,
            cvc: cvc,
            card: card
        }
        
        console.log(currentUser);

        //Clean the state
        setAddress('')
        setCountry('')
        setPostCode('')
        setState('')
        setTown('')
        setCardNumber('')
        setCvc('')
        setCard('')

        history('/')
    }


    return (
        <div>
        <Header title={Purchase}/>
            <h1>Purchase</h1>
            <p>{currentUser.email}</p>
            <div>
            {step < 5 && (
            <button hidden={nextDisabled} onClick={() => setStep(step + 1)}>Next</button>)}
            {step > 0 && (
            <button hidden={prevDisabled} onClick={() => setStep(step - 1)}>Back</button>)}
            </div>
            <Form onSubmit={handleSubmit}>
            {step===1 && (<div> <h1>1.User address and shipping details</h1>
                <Form.Group id="address">
                <Form.Label>Adress</Form.Label>
                <Form.Control
                type="text"
                name="address"
                value={address}
                onChange={changeAddress}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="town">
                <Form.Label>Town</Form.Label>
                <Form.Control
                type="text"
                name="town"
                value={town}
                onChange={changeTown}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                type="text"
                name="state"
                value={state}
                onChange={changeState}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="postCode">
                <Form.Label>PostCode</Form.Label>
                <Form.Control
                type="text"
                name="postCode"
                value={postCode}
                onChange={changePostCode}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                type="text"
                name="country"
                value={country}
                onChange={changeCountry}
                required
                ></Form.Control>
                </Form.Group>
                </div>)
            }
            {step===2 && (<div> <h1> 2.Payment info</h1>
                <Form.Group id="card">
                <Form.Label>Card Holder Fullname</Form.Label>
                <Form.Control
                type="text"
                name="card"
                value={card}
                onChange={changeCard}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="cvc">
                <Form.Label>CVC</Form.Label>
                <Form.Control
                type="text"
                name="cvc"
                value={cvc}
                onChange={changeCvc}
                required
                ></Form.Control>
                </Form.Group>
                <Form.Group id="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                type="text"
                name="cardNumber"
                value={cardNumber}
                onChange={changeCardNumber}
                required
                ></Form.Control>
                </Form.Group>
                </div>)
            }
            {step===3 && (<div> <h1>3.Review info</h1>
                <p>Here the summary of the purchase with a get from the localstorage</p>
                <div>
                    {address}
                </div>
                <div>
                    {town}
                </div>
                <div>
                    {state}
                </div>
                <div>
                    {postCode}
                </div>
                <div>
                    {country}
                </div>
                <div>
                    {card}
                </div>
                <div>
                    {cvc}
                </div>
                <div>
                    {cardNumber}
                </div>
                </div>)
            }
            {step===4 && (<div> <h1>4.Confirm checkout</h1>
                <Button className="w-100" type="submit">Confirm Purchase</Button>
                </div>)
            }
            </Form>
        </div>
    )
}
