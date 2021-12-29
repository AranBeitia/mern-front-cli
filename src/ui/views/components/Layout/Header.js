import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

function Header({ title }) {
  console.log(title)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} className="link">
            Luna negra shop
          </Link>
        </Navbar.Brand>
        <Navbar.Text>{title}</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
