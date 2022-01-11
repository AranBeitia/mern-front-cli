import { Link } from 'react-router-dom'
import './AdminNav.scss'
import { useAuth } from '../../../../context/AuthContext.js'

function AdminNav() {
  const { currentUser } = useAuth()
  let isAdmin = false
  if (currentUser.role === 'admin') {
    isAdmin = true
  }
  return (
    <aside>
      <nav className="admin-nav d-flex flex-column">
      {isAdmin ? (
        <Link to={'/products'} className="ico-product">
          Products
        </Link>) : null}
        <Link to={'/employees'} className="ico-employee">
          Users
        </Link>
      </nav>
    </aside>
  )
}

export default AdminNav
