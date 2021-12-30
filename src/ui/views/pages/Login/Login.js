import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState()
  const history = useNavigate()
  const [user, setUser] = useState('test')

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((credentials) => {
        if (credentials) {
          setAuth(true)
        }
        fetchData(credentials.user.accessToken)
      })
      .catch((err) => {
        console.log(err)
      })

    const fetchData = async (token) => {
      console.log(token)
      const loginResponse = await fetch('http://localhost:4000/users/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => data)

      console.log(loginResponse)
      setUser(loginResponse.user.email)
    }

    // try {
    //   setError('')
    //   setLoading(true)
    //   const token = await auth
    //     .signInWithEmailAndPassword(
    //       emailRef.current.value,
    //       passwordRef.current.value
    //     )
    //     .then((res) => res)
    //   console.log(token)

    //   history('/')
    // } catch (error) {
    //   setError('Failed to login')
    // }
  }
  return (
    <>
      {auth && user ? <div>{user} is logged</div> : <div>Not Logged</div>}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
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
                <Button disabled={loading} className="w-100" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">SignUp</Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Login
