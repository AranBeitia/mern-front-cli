import { Link } from 'react-router-dom'

import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import CardProductFeed from '../../components/CardProduct'

function Product() {
  return (
    <>
      <Header />
      <Container className="grid">
        <AdminNav />
        <main>
          <Link to={'/products/new'} className="btn btn-dark my-4">
            <i className="fas fa-plus-circle"></i>New Product
          </Link>
          <CardProductFeed isEditable={true} />
        </main>
      </Container>
    </>
  )
}

export default Product
