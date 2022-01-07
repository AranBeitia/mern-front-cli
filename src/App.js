import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import Product from './ui/views/pages/Product'
import ProductNew from './ui/views/pages/Product/ProductNew'
import ProductEdit from './ui/views/pages/Product/ProductEdit'
import Employee from './ui/views/pages/EmployeeCrud'
import Client from './ui/views/pages/ClientCrud'
import SignUp from './ui/views/pages/SignUp'
import { UsersContextProvider } from './context/UsersContext'
import PrivateRouter from './ui/views/pages/Private/PrivateRouter'
import EmployeeNew from './ui/views/pages/EmployeeCrud/EmployeeNew'
import EmployeeEdit from './ui/views/pages/EmployeeCrud/EmployeeEdit'

function App() {
  return (
    <AuthProvider>
      <UsersContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<PrivateRouter />} />

          <Route path="/products" element={<Product />} />
          <Route path="/products/new" element={<ProductNew />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />

          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/new" element={<EmployeeNew />} />
          <Route path="/employees/:id" element={<EmployeeEdit />} />

          <Route path="/clients" element={<Client />} />
        </Routes>
      </UsersContextProvider>
    </AuthProvider>
  )
}

export default App
