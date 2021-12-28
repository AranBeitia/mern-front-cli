import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header({ title }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Chiringuito e-commerce</Navbar.Brand>
        <Navbar.Text>{title}</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Header
