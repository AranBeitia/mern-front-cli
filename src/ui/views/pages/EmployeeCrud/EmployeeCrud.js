import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import CardEmployeeFeed from '../../components/CardEmployee/CardEmployeeFeed'
import { Link } from 'react-router-dom'

function EmployeeCrud() {
  return (
    <>
      <Header />
      <Container className="grid">
        <AdminNav />
        <main>
          <Link to={'/employees/new'} className="btn btn-dark my-4">
            <i className="fas fa-plus-circle"></i>New User
          </Link>
          <CardEmployeeFeed />
        </main>
      </Container>
    </>
  )
}

export default EmployeeCrud
