import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Layout/Header'
import { auth } from '../../../../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '../../../../context/AuthContext'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useState()
  const history = useNavigate()
  const [user, setUser] = useState('test')
  const { setIsLogged } = useAuth()

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
        switch (true) {
          case err.message.includes('password'):
            setError('Password incorrect, please try again')
            break
          case err.message.includes('user'):
            setError('User incorrect or not found, please try again or SignUp')
            break
          default:
            setError('Server error, try to connect')
            break
        }
      })

    const fetchData = async (token) => {
      const loginResponse = await fetch('http://localhost:4000/users/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => data)

      setUser(loginResponse.user.email)
      setIsLogged(true)
      history('/')
    }
  }
  return (
    <>
      <Header title="Login" />
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
