import Header from '../../components/Layout/Header'
import Container from 'react-bootstrap/Container'
import AdminNav from '../../components/Layout/AdminNav'

function Admin() {
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>admin</h2>
        </main>
      </Container>
    </>
  )
}

export default Admin
