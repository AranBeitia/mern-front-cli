import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from '../Spinner'

function CardProduct({ isEditable }) {
  const [products, setProducts] = useState([])

  const consultAPI = async () => {
    const consultProducts = await clientAxios.get('/products')
    setProducts(consultProducts.data.data)
  }

  useEffect(() => {
    consultAPI()
  }, [])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Product deleting. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios.delete(`/products/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire('Deleted!', res.data.message, 'success')
          }
        })
      }
    })
  }

  if (!products.length) return <Spinner />

  return (
    <>
      {products ? (
        products.map((product) => (
          <Card key={product._id}>
            <Card.Img variant="top" src={product.images.main} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <small className="text-muted">{product.price}€ - </small>
              <small className="text-muted">{product.stock} units</small>
            </Card.Body>

            {isEditable ? (
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="success">Edit</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Card.Footer>
            ) : null}
          </Card>
        ))
      ) : (
        <p>No products</p>
      )}
    </>
  )
}

export default CardProduct
