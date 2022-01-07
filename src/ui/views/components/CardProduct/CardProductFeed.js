import React, { useState, useEffect } from 'react'
import clientAxios from '../../../../config/axios'

import CardProduct from './CardProduct'

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

  return (
    <div className="grid-wrapper">
      <CardProduct isEditable={isEditable} />
    </div>
  )
}

export default CardProductFeed
