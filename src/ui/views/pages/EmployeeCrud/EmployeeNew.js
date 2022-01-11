import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Swal from 'sweetalert2'
import { Container, Form, Button } from 'react-bootstrap'
import clientAxios from '../../../../config/axios'
import { useUsers } from '../../../../context/UsersContext'
import { useAuth } from '../../../../context/AuthContext'

export default function EmployeeNew() {
  let navigate = useNavigate()
  const { role } = useAuth()
  const { id } = useParams()
  const [user, setUser] = useState()
  const { users, loadUsers } = useUsers()

  const fetchUser = async () => {
    const res = await clientAxios.get('/users')
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
      const res = await clientAxios.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'role': role,
        },
      })
      if (res.status === 201) {
        Swal.fire('Product added correctly', res.data.message, 'success')
        navigate('/employees')
      }
    } catch (error) {
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
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>New User</h2>
          <Form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <Form.Group controlId="fullName" className="col">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
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
                  onChange={handleUser}
                />
              </Form.Group>
            </div>
            <div className="row mb-3">
              <Form.Group controlId="role" className="col">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" onChange={handleUser}>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option selected value="client">
                    Client
                  </option>
                </Form.Control>
              </Form.Group>
            </div>
            <Button variant="info" type="submit">
              Submit
            </Button>
          </Form>
        </main>
      </Container>
    </>
  )
}
