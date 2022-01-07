import React, { useEffect, useState } from 'react'
import Gallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'

function ImageGallery({ gallery }) {
  const [images, setImages] = useState(null)

  useEffect(() => {
    if (gallery) {
      setImages(
        gallery.map((image) => ({
          original: `http://localhost:4000/${image}`,
          thumbnail: `http://localhost:4000/${image}`,
        }))
      )
    }
  }, [])

  return images ? <Gallery items={images} /> : null
}
export default ImageGallery
