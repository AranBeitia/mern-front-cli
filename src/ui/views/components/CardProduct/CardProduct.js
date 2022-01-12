import React from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import noImage from '../../../assets/img/no-image.jpeg'
import TheModal from '../TheModal'
import { useProduct } from '../../../../context/ProductContext'
import { useCart } from '../../../../context/CartContext'
import {getlocalStorage} from '../../../../utils/localStorage'

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
  const { change } = useProduct()
  const { products, addToCart } = useCart()

  const currentUser = getlocalStorage()
  let role = ''
  currentUser ? (role = currentUser.role) : (role ='client')
  console.log(role)

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
        clientAxios.delete(`/products/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'role': role,
          },
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire('Deleted!', res.data.message, 'success')
            change()
          }
        })
      }
    })
  }

  return (
    <>
      <Card>
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
              ? `${description.slice(0, 150)}...`
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
          <div className="d-flex justify-content-between p-3">
            <Button variant="dark" onClick={() => setModalShow(true)}>
              See more
            </Button>
            <Button
              variant="success"
              onClick={() =>
                addToCart([{ title: title, price: price, id: id }, ...products])
              }
            >
              Purchase
            </Button>
          </div>
        )}
      </Card>
      {!isEditable && (
        <TheModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          title={title}
          description={description}
          price={price}
          stock={stock}
          image={image}
          gallery={gallery}
        />
      )}
    </>
  )
}

export default CardProduct
