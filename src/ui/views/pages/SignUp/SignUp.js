import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Header from '../../components/Layout/Header'
import { useAuth } from '../../../../context/AuthContext'

function SignUp() {
  const fullnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsLogged, currentUser, setCurrentUser } = useAuth()
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const fullName = fullnameRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value

    if (password.length < 8) {
      return setError('Passwords must be longer than 7 characters')
    }

    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      createUserWithEmailAndPassword(getAuth(), email, password).then(
        (credentials) => {
          if (credentials) {
            signUpUser(credentials._tokenResponse.idToken)
            setCurrentUser(credentials.user);
          }
        }
        )
        setIsLogged(true)
        history('/')
      } catch (error) {
        console.log(error)
      }
      
      async function signUpUser(token) {
        const newUser = {
          fullName: fullName,
          email: email,
          password: password,
        }
        const signUpResponse = await fetch('http://localhost:4000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUser),
        })
      }
  }
  return (
    <>
      <Header />
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
                <Form.Group id="fullname">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    type="text"
                    ref={fullnameRef}
                    required
                  ></Form.Control>
                </Form.Group>
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
