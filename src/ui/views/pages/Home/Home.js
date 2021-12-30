import CardProductFeed from '../../components/CardProduct'
import Header from '../../components/Layout/Header'
import Container from 'react-bootstrap/Container'

function Home() {
  return (
    <>
      <Header title={'Products'} />
      <Container className="my-5">
        <CardProductFeed />
      </Container>
    </>
  )
}

export default Home
