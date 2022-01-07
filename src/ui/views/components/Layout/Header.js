import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.js'

function Header({ title }) {
  console.log(title)
  const { currentUser } = useAuth()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} className="link">
            Luna negra shop
          </Link>
        </Navbar.Brand>
        <Navbar.Text>{title}</Navbar.Text>
        <Navbar.Text>Welcome {currentUser.email}</Navbar.Text>
        <div as={Row}>
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
          <Navbar.Text as={Col}>
            <Link to={'/'} className="link">
              Logout
            </Link>
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
