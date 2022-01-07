import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'
import CardProduct from './CardProduct'
import Spinner from '../Spinner'

function CardProductFeed({ isEditable }) {
  const [products, setProducts] = useState([])
  const [hasChanged, setHasChanged] = useState(false)

  const consultAPI = async () => {
    const consultProducts = await clientAxios.get('/products')
    setProducts(consultProducts.data.data)
  }

  useEffect(() => {
    consultAPI()
  }, [])

  useEffect(() => {
    if (hasChanged) {
      consultAPI()
      setHasChanged(false)
    }
  }, [hasChanged])

  if (!products.length) return <Spinner />

  return (
    <div className="grid-wrapper">
      {products ? (
        products.map((product) => (
          <CardProduct
            key={product._id}
            id={product._id}
            image={product.mainImage}
            gallery={product.gallery}
            title={product.title}
            description={product.description}
            price={product.price}
            stock={product.stock}
            isEditable={isEditable}
            onClick={() => setModalShow(true)}
          />
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  )
}

export default CardProductFeed
