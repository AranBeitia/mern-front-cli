import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clientAxios from '../../../../config/axios'

import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'

import { useProduct } from '../../../../context/ProductContext'
import { getlocalStorage } from '../../../../utils/localStorage'

function ProductNew() {
  let navigate = useNavigate()
  const { change } = useProduct()

  const currentUser = getlocalStorage()
  const role = currentUser.role

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
  })
  const [file, setFile] = useState('')

  const handleProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price)
    formData.append('stock', product.stock)
    formData.append('mainImage', file)

    try {
      const res = await clientAxios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'role': role,
        },
      })

      if (res.status === 200) {
        Swal.fire('Product added correctly', res.data.message, 'success')
        change()
        navigate('/products')
      }
    } catch (error) {
      Swal.fire({
        type: 'error',
        title: 'An error occurred',
        text: 'Try again',
      })
    }
  }
  return (
    <>
      <Header />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>new product</h2>
          <Form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <Form.Group controlId="title" className="col">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={handleProduct}
                />
              </Form.Group>

              <Form.Group controlId="description" className="col">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  onChange={handleProduct}
                />
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group className="col" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="1234"
                  onChange={handleProduct}
                />
              </Form.Group>

              <Form.Group className="col" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="32"
                  onChange={handleProduct}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" id="images">
              <Form.Control
                type="file"
                name="mainImage"
                label="Upload image"
                onChange={handleFile}
              />
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
