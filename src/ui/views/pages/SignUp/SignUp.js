import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase'

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      history('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SignUp
