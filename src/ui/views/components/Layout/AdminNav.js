import { Link } from 'react-router-dom'
import './AdminNav.scss'

function AdminNav() {
  return (
    <aside>
      <nav className="admin-nav d-flex flex-column">
        <Link to={'/products'} className="ico-product">
          Products
        </Link>
        <Link to={'/employees'} className="ico-employee">
          Users
        </Link>
      </nav>
    </aside>
  )
}

export default AdminNav
