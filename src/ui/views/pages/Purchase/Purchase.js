import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Header from '../../components/Layout/Header'
import { useAuth } from '../../../../context/AuthContext'



export default function Purchase() {
    const { currentUser } = useAuth()
    const [step, setStep] = useState(1)
    const emailRef = useRef()

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
        
        const email = emailRef.current.value

        console.log(currentUser);
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
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                ref={emailRef}
                required
                ></Form.Control>
                </Form.Group>
                </div>)
            }
            {step===2 && (<div> <h1> 2.Payment info</h1>
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                ref={emailRef}
                required
                ></Form.Control>
                </Form.Group>
                </div>)
            }
            {step===3 && (<div> <h1>3.Review info</h1>
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                ref={emailRef}
                required
                ></Form.Control>
                </Form.Group>
                </div>)
            }
            {step===4 && (<div> <h1>4.Confirm checkout</h1>
                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                ref={emailRef}
                required
                ></Form.Control>
                </Form.Group>
                <Button className="w-100" type="submit">Confirm Purchase</Button>
                </div>)
            }
            </Form>
        </div>
    )
}
