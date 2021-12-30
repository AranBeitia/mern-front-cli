import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'

function EmployeeCrud() {
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>emoloyee crud</h2>
        </main>
      </Container>
    </>
  )
}

export default EmployeeCrud
