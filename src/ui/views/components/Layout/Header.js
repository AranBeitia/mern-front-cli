import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.js'
import { useState } from 'react'

function Header({ title }) {
  console.log(title)
  const history = useNavigate()
  const { currentUser, isLogged, setIsLogged, logout } = useAuth()
  function handleLogout() {
    logout()
    setIsLogged(false)
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} className="link">
              Luna negra shop
            </Link>
          </Navbar.Brand>
          <Navbar.Text>{title}</Navbar.Text>
          {currentUser ? (
            <Navbar.Text>Welcome {currentUser.email}</Navbar.Text>
          ) : null}
          <div as={Row}>
            {!isLogged ? (
              <div>
                <Navbar.Text as={Col}>
                  <Link to={'/login'} className="link">
                    Login
                  </Link>
                </Navbar.Text>
                <Navbar.Text as={Col}>
                  <Link to={'/signup'} className="link">
                    SignUp
                  </Link>
                </Navbar.Text>
              </div>
            ) : (
              <Navbar.Text as={Col}>
                <Button onClick={() => handleLogout()} className="link">
                  Logout
                </Button>
              </Navbar.Text>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
