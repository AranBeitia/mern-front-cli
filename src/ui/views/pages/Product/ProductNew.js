import { useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ProductNew() {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    stock: '',
  })
  const [file, setFile] = useState('')
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>new product</h2>
          <Form>
            <div className="row mb-3">
              <Form.Group controlId="title" className="col">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>

              <Form.Group controlId="description" className="col">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" />
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group className="col" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="1234" />
              </Form.Group>

              <Form.Group className="col" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="32" />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" id="image">
              <Form.Control type="file" label="Upload image" />
            </Form.Group>

            <Button variant="info" type="submit">
              Submit
            </Button>
          </Form>
        </main>
      </Container>
    </>
  )
}

export default ProductNew
