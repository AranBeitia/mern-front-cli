import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function CardProduct({ isEditable }) {
  const [products, setProducts] = useState([])

  const consultAPI = async () => {
    const consultProducts = await clientAxios.get('/products')
    setProducts(consultProducts.data.data)
  }

  useEffect(() => {
    consultAPI()
  }, [])

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
                <Button variant="danger">Delete</Button>
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
