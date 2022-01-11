import React from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import noImage from '../../../assets/img/no-image.jpeg'
import TheModal from '../TheModal'
import { useCart } from '../../../../context/CartContext'

function CardProduct({
  isEditable,
  title,
  description,
  price,
  stock,
  id,
  image,
  gallery,
}) {
  const [modalShow, setModalShow] = React.useState(false)
  const { products, addToCart } = useCart()
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
          setHasChanged(true)
        })
      }
    })
  }

  return (
    <>
      <Card
        className={!isEditable ? 'hover' : ''}
        onClick={() => setModalShow(true)}
      >
        {image ? (
          <Card.Img
            variant="top"
            className="cover"
            src={`http://localhost:4000/${image}`}
          />
        ) : (
          <Card.Img className="contain" variant="top" src={noImage} />
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {description.length > 150
              ? `${description.slice(0, 150)}... see more`
              : description}
          </Card.Text>
          <div>
            <small className="text-muted">{price}€ - </small>
            <small className="text-muted">{stock} units</small>
          </div>
        </Card.Body>

        {isEditable ? (
          <Card.Footer className="d-flex justify-content-between">
            <Link to={`/products/edit/${id}`} className="btn btn-success">
              Edit
            </Link>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Card.Footer>
        ) : (
          <Button
            variant="success"
            onClick={() =>
              addToCart([{ title: title, price: price, id: id }, ...products])
            }
          >
            Purchase
          </Button>
        )}
      </Card>
      {!isEditable ? (
        <TheModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={title}
          description={description}
          price={price}
          stock={stock}
          image={image}
          gallery={gallery}
        />
      ) : null}
    </>
  )
}

export default CardProduct
