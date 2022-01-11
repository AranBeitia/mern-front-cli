import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'
import { ProductProvider } from './context/ProductContext'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import SignUp from './ui/views/pages/SignUp'
import Purchase from './ui/views/pages/Purchase/Purchase'
import { CartContextProvider } from './context/CartContext'
import CartResume from './ui/views/pages/CartResume/CartResume'
import Forbidden from './ui/views/pages/Forbidden/Forbidden'
import { AdminPrivateRouter, EmployeeEditPrivateRouter, EmployeeNewPrivateRouter, EmployeePrivateRouter, ProdEditPrivateRouter, ProdNewPrivateRouter } from './ui/views/pages/Private/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <UsersContextProvider>
        <ProductProvider>
          <CartContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminPrivateRouter />} />

              <Route path="/products" element={<AdminPrivateRouter />} />
              <Route path="/products/new" element={<ProdNewPrivateRouter />} />
              <Route path="/products/edit/:id" element={<ProdEditPrivateRouter />} />

              <Route path="/employees" element={<EmployeePrivateRouter />} />
              <Route path="/employees/new" element={<EmployeeNewPrivateRouter />} />
              <Route path="/employees/:id" element={<EmployeeEditPrivateRouter />} />

              <Route path="/resume" element={<CartResume />} />
              <Route path="/purchase" element={<Purchase />} />

              <Route path="/403" element={<Forbidden />} />
            </Routes>
          </CartContextProvider>
        </ProductProvider>
      </UsersContextProvider>
    </AuthProvider>
  )
}

export default App
