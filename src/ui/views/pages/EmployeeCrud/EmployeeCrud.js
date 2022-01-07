import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'
import CardEmployeeFeed from '../../components/CardEmployee/CardEmployeeFeed'

function EmployeeCrud() {
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>Employee crud</h2>
          <CardEmployeeFeed />
        </main>
      </Container>
    </>
  )
}

export default EmployeeCrud
