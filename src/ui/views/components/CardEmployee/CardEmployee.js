import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import clientAxios from '../../../../config/axios'
import Swal from 'sweetalert2'
import { useUsers } from '../../../../context/UsersContext'
import { Link } from 'react-router-dom'

function CardEmployee(props) {
  const { changeUsers } = useUsers()

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
        clientAxios.delete(`/users/${id}`).then((res) => {
          if (res.status === 200) {
            changeUsers()
            Swal.fire('Deleted!', res.data.message, 'success')
          }
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
          <Link to={`/employees/${props.id}`}>
            <Button variant="success">Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(props.id)}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}

export default CardEmployee
