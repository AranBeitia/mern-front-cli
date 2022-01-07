import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from '../Spinner'
import noImage from '../../../assets/img/no-image.jpeg'
// import TheModal from '../TheModal'

function CardProduct({ isEditable }) {
  const [products, setProducts] = useState([])
  const [hasChanged, setHasChanged] = useState(false)
  // const [modalShow, setModalShow] = useState(false)

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

  if (!products.length) return <Spinner />

  return (
    <>
      {products ? (
        products.map((product) => (
          <div key={product._id}>
            <Card
              className={!isEditable ? 'hover' : ''}
              // onClick={() => setModalShow(true)}
            >
              {product.images ? (
                <Card.Img
                  variant="top"
                  className="cover"
                  src={`http://localhost:4000/${product.images}`}
                />
              ) : (
                <Card.Img className="contain" variant="top" src={noImage} />
              )}
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description.length > 150
                    ? `${product.description.slice(0, 150)}...`
                    : product.description}
                </Card.Text>
                <small className="text-muted">{product.price}€ - </small>
                <small className="text-muted">{product.stock} units</small>
              </Card.Body>

              {isEditable ? (
                <Card.Footer className="d-flex justify-content-between">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              ) : null}
            </Card>
            {/* <TheModal
              title={product.title}
              show={modalShow}
              onHide={() => setModalShow(false)}
            /> */}
          </div>
        ))
      ) : (
        <p>No products</p>
      )}
    </>
  )
}

export default CardProduct
