import { Link } from 'react-router-dom'

function AdminNav() {
  return (
    <aside>
      <h2>Admin</h2>
      <nav>
        <Link to={'/products'}>Products</Link>
        <Link to={'/employees'}>Employees</Link>
        <Link to={'/clients'}>Clients</Link>
      </nav>
    </aside>
  )
}

export default AdminNav
