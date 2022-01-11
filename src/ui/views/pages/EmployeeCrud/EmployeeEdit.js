import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Swal from 'sweetalert2'
import { Container, Form, Button } from 'react-bootstrap'
import clientAxios from '../../../../config/axios'
import { useAuth } from '../../../../context/AuthContext'
import { getlocalStorage } from '../../../../utils/localStorage'

export default function EmployeeEdit() {
  let navigate = useNavigate()
  
  const currentUser = getlocalStorage()
  const role = currentUser.role
  
  const { id } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const res = await clientAxios.get(`/users/${id}`)
    setUser(res.data.data)
  }

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName', user.fullName)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('role', user.role)
    try {
      const res = await clientAxios.patch(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'role': role,
        },
      })
      if (res.status === 200) {
        Swal.fire('Product added correctly', res.data.message, 'success')
        navigate('/employees')
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        type: 'error',
        title: 'An error occurred',
        text: 'Try again',
      })
    }
  }
  return (
    <>
      <Header title={'Administration'} />
      {user && (
        <Container className="grid">
          <AdminNav />
          <main>
            <h2>Edit User</h2>
            <Form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <Form.Group controlId="fullName" className="col">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter Full Name"
                    value={user.fullName}
                    onChange={handleUser}
                  />
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group controlId="email" className="col">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={handleUser}
                  />
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group controlId="password" className="col">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={handleUser}
                  />
                </Form.Group>
              </div>
              <div className="row mb-3">
                <Form.Group controlId="role" className="col">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={user.role}
                    onChange={handleUser}
                  >
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <Button variant="info" type="submit">
                Submit
              </Button>
            </Form>
          </main>
        </Container>
      )}
    </>
  )
}
