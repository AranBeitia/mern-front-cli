import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'

import Card from 'react-bootstrap/Card'
import kitty from '../../../assets/img/hello-kitty.jpg'

function CardProduct() {
  const [products, setProducts] = useState([])

  const consultAPI = async () => {
    const consultProducts = await clientAxios.get('/books')
    setProducts(consultProducts.data.data)
  }

  useEffect(() => {
    consultAPI()
  }, [])

  return (
    <>
      {products ? (
        products.map((product) => (
          <Card>
            <Card.Img variant="top" src={kitty} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
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
