import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'

function CardEmployee(props) {
  const [hasChanged, setHasChanged] = useState(false)

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "User deleting. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        clientAxios.delete(`/users/${id}`).then((res) => {
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
      <Card key={props.id}>
        <Card.Body>
          <Card.Title>{props.fullName}</Card.Title>
          <Card.Text>{props.email}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="success">Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(props.id)}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}

export default CardEmployee
