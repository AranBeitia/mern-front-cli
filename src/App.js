import { Routes, Route } from 'react-router-dom'

import Home from './ui/views/pages/Home/Home'
import Login from './ui/views/pages/Login'
import Product from './ui/views/pages/ProductCrud'
import Employee from './ui/views/pages/EmployeeCrud'
import Client from './ui/views/pages/ClientCrud'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Product />} />

      <Route path="/products" element={<Product />} />
      <Route path="/employees" element={<Employee />} />
      <Route path="/clients" element={<Client />} />
    </Routes>
  )
}

export default App
