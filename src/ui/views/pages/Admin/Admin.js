import { Routes, Route } from 'react-router-dom'

import Header from '../../components/Layout/Header'
import Container from 'react-bootstrap/Container'
import AdminNav from '../../components/Layout/AdminNav'

import Product from '../ProductCrud'
import Employee from '../EmployeeCrud'
import Client from '../ClientCrud'

function Admin() {
  return (
    <>
      <Header title={'Administration'} />
      <Container>
        <AdminNav />
        <main>
          <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/clients" element={<Client />} />
          </Routes>
        </main>
      </Container>
    </>
  )
}

export default Admin
