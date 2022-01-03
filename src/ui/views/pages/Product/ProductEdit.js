import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clientAxios from '../../../../config/axios'

import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'

function ProductEdit() {
  const { id } = useParams()
  let navigate = useNavigate()
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
  })
  const [file, setFile] = useState('')
  const [hasChanged, setHasChanged] = useState(false)

  const consultAPI = async () => {
    const consultProduct = await clientAxios.get(`/products/${id}`)
    setProduct(consultProduct.data.data)
  }

  useEffect(() => {
    consultAPI()
  }, [])

  useEffect(() => {
    if (hasChanged) {
      consultAPI()
      setHasChanged(true)
    }
  }, [hasChanged])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price)
    formData.append('stock', product.stock)
    formData.append('images', file)

    try {
      const res = await clientAxios.patch(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.status === 200) {
        Swal.fire('Product added correctly', res.data.message, 'success')
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

  const handleProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile({
      ...file,
      file: e.target.files[0],
    })
  }

  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>edit product</h2>
          <Form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <Form.Group controlId="title" className="col">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={handleProduct}
                  defaultValue={product.title}
                />
              </Form.Group>

              <Form.Group controlId="description" className="col">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  onChange={handleProduct}
                  defaultValue={product.description}
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
                  defaultValue={product.price}
                />
              </Form.Group>

              <Form.Group className="col" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="32"
                  onChange={handleProduct}
                  defaultValue={product.stock}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" id="images">
              {product.images ? (
                <img
                  src={`http://localhost:4000/${product.images}`}
                  alt={product.images}
                  width="200"
                />
              ) : null}
              <Form.Control
                type="file"
                name="images"
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

export default ProductEdit
