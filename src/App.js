import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { UsersContextProvider } from './context/UsersContext'
import { ProductProvider } from './context/ProductContext'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import SignUp from './ui/views/pages/SignUp'
import { CartContextProvider } from './context/CartContext'
import CartResume from './ui/views/pages/CartResume/CartResume'
import Forbidden from './ui/views/pages/Forbidden/Forbidden'
import {
  AdminPrivateRouter,
  EmployeeEditPrivateRouter,
  EmployeeNewPrivateRouter,
  EmployeePrivateRouter,
  ProdEditPrivateRouter,
  ProdNewPrivateRouter,
} from './ui/views/pages/Private/PrivateRoute'

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
                <Route path="/admin" element={<AdminPrivateRouter />} />

                <Route path="/products" element={<AdminPrivateRouter />} />
                <Route
                  path="/products/new"
                  element={<ProdNewPrivateRouter />}
                />
                <Route
                  path="/products/edit/:id"
                  element={<ProdEditPrivateRouter />}
                />

                <Route path="/employees" element={<EmployeePrivateRouter />} />
                <Route
                  path="/employees/new"
                  element={<EmployeeNewPrivateRouter />}
                />
                <Route
                  path="/employees/:id"
                  element={<EmployeeEditPrivateRouter />}
                />

                <Route path="/resume" element={<CartResume />} />
                <Route path="/step1" element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/step4" element={<Step4 />} />

                <Route path="/403" element={<Forbidden />} />
              </Routes>
            </PurchaseContextProvider>
          </CartContextProvider>
        </ProductProvider>
      </UsersContextProvider>
    </AuthProvider>
  )
}

export default App
