import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.js'
import { useCart } from '../../../../context/CartContext.js'
import { getlocalStorage } from '../../../../utils/localStorage.js'
import './Header.scss'

function Header() {
  const { products, resumeCart, total } = useCart()
  const { logout } = useAuth()
  const history = useNavigate()
  function handleLogout() {
    logout()
    history('/')
  }

  const currentUser = getlocalStorage()

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} className="link">
              Luna negra shop
            </Link>
          </Navbar.Brand>
          {currentUser && (
            <Navbar.Text>Welcome {currentUser.email}</Navbar.Text>
          )}
          <div as={Row}>
            {!currentUser ? (
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
          {products.length > 0 && (
            <Link to={'/resume'} className="header__link d-flex">
              <span className="ico-basquet"></span>
              <div onClick={resumeCart} className="d-flex flex-column">
                <span className="text-light">{products.length} items</span>
                <span className="text-light">{total}€</span>
              </div>
            </Link>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
