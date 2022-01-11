import React from 'react'
import CardProduct from './CardProduct'
import Spinner from '../Spinner'
import { useProduct } from '../../../../context/ProductContext'

function CardProductFeed({ isEditable }) {
  const { products, isLoading, changed } = useProduct()

  return (
    <div className="grid-wrapper">
      {isLoading && <Spinner />}
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
