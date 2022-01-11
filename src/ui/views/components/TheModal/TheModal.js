import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ImageGallery from '../ImageGallery'
import { useCart } from '../../../../context/CartContext'

function TheModal(props) {
  const [images, setImages] = useState(null)
  const { addToCart, products } = useCart()

  useEffect(() => {
    if (props.gallery) {
      setImages(
        props.gallery.map((image) => ({
          original: `http://localhost:4000/${image}`,
          thumbnail: `http://localhost:4000/${image}`,
        }))
      )
    }
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h2>{props.title}</h2>
        <div className="d-flex my-3">
          <img
            className="[ cover --highlight ]"
            src={`http://localhost:4000/${props.image}`}
            alt={props.image}
          />
          <div className="d-flex flex-column mx-3">
            <p>{props.description}</p>
            <p>
              <span className="fw-bold">Price:</span> {props.price}€
            </p>
            <p>
              <span className="fw-bold">Stock: </span>
              {props.stock} units
            </p>
            <Button
              variant="success"
              onClick={() =>
                addToCart([
                  { title: props.title, price: props.price, id: props.id },
                  ...products,
                ])
              }
            >
              Purchase
            </Button>
          </div>
        </div>

        <ImageGallery gallery={props.gallery} lazyLoad="true" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TheModal
