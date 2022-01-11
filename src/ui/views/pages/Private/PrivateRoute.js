import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import Product from '../Product'
import Employee from '../EmployeeCrud'
import EmployeeNew from '../EmployeeCrud/EmployeeNew'
import EmployeeEdit from '../EmployeeCrud/EmployeeEdit'
import ProductNew from '../Product/ProductNew'
import ProductEdit from '../Product/ProductEdit'

function AdminPrivateRouter({ children, ...rest }) {
  const { role } = useAuth()
  console.log(role)
  if (role !== 'admin') {
    return <Navigate to="/403" />
  }
  return <Product />
}

function ProdNewPrivateRouter({ children, ...rest }) {
    const { role } = useAuth()
    if (role !== 'employee' && role !== 'admin') {
      return <Navigate to="/403" />
    }
    return <ProductNew />
  }

  function ProdEditPrivateRouter({ children, ...rest }) {
    const { role } = useAuth()
    if (role !== 'employee' && role !== 'admin') {
      return <Navigate to="/403" />
    }
    return <ProductEdit />
  }

function EmployeePrivateRouter({ children, ...rest }) {
  const { role } = useAuth()
  if (role !== 'admin') {
    return <Navigate to="/403" />
  }
  return <Employee />
}

function EmployeeNewPrivateRouter({ children, ...rest }) {
    const { role } = useAuth()
    if (role !== 'admin') {
      return <Navigate to="/403" />
    }
    return <EmployeeNew />
  }

  function EmployeeEditPrivateRouter({ children, ...rest }) {
    const { role } = useAuth()
    if (role !== 'admin') {
      return <Navigate to="/403" />
    }
    return <EmployeeEdit />
  }

export { AdminPrivateRouter, EmployeePrivateRouter, EmployeeNewPrivateRouter, EmployeeEditPrivateRouter, ProdNewPrivateRouter, ProdEditPrivateRouter }