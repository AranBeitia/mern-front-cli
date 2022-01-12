import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'
import { ProductProvider } from './context/ProductContext'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import Product from './ui/views/pages/Product'
import ProductNew from './ui/views/pages/Product/ProductNew'
import ProductEdit from './ui/views/pages/Product/ProductEdit'
import Employee from './ui/views/pages/EmployeeCrud'
import SignUp from './ui/views/pages/SignUp'
import EmployeeNew from './ui/views/pages/EmployeeCrud/EmployeeNew'
import EmployeeEdit from './ui/views/pages/EmployeeCrud/EmployeeEdit'
import { CartContextProvider } from './context/CartContext'
import CartResume from './ui/views/pages/CartResume/CartResume'

import { PurchaseContextProvider } from './context/PurchaseContext'
import Step1 from './ui/views/pages/Purchase/Step1'
import Step2 from './ui/views/pages/Purchase/Step2'
import Step4 from './ui/views/pages/Purchase/Step4'
import Step3 from './ui/views/pages/Purchase/Step3'

function App() {
  return (
    <AuthProvider>
      <UsersContextProvider>
        <ProductProvider>
          <CartContextProvider>
            <PurchaseContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin" element={<Product />} />

                <Route path="/products" element={<Product />} />
                <Route path="/products/new" element={<ProductNew />} />
                <Route path="/products/edit/:id" element={<ProductEdit />} />

                <Route path="/employees" element={<Employee />} />
                <Route path="/employees/new" element={<EmployeeNew />} />
                <Route path="/employees/:id" element={<EmployeeEdit />} />

                <Route path="/resume" element={<CartResume />} />
                <Route path="/step1" element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/step4" element={<Step4 />} />
              </Routes>
            </PurchaseContextProvider>
          </CartContextProvider>
        </ProductProvider>
      </UsersContextProvider>
    </AuthProvider>
  )
}

export default App
