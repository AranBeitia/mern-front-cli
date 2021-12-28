import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'

import Card from 'react-bootstrap/Card'

function CardProduct() {
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
            {/* <Card.Img
              variant="top"
              src={`http://localhost:4000/${product.images}`}
            /> */}
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{product.price}€ - </small>
              <small className="text-muted">{product.stock} units</small>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p>No products</p>
      )}
    </>
  )
}

export default CardProduct
