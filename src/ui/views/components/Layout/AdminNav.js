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
          <div>
            <Link to={'/products'} className="ico-product">
              Products
            </Link>
            <Link to={'/employees'} className="ico-employee">
              Users
            </Link>
          </div>
        ) : (
          <Link to={'/products'} className="ico-product">
            Products
          </Link>
        )}
      </nav>
    </aside>
  )
}

export default AdminNav
