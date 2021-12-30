import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import CardProductFeed from '../../components/CardProduct'
function ProductCrud() {
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>product crud</h2>
          <CardProductFeed />
        </main>
      </Container>
    </>
  )
}

export default ProductCrud
