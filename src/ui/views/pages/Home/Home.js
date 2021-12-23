import CardProductFeed from '../../components/CardProduct'
import Container from 'react-bootstrap/Container'

function Home() {
  return (
    <Container>
      <h1>Products</h1>
      <CardProductFeed />
    </Container>
  )
}

export default Home
