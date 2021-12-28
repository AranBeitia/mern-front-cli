import Header from '../../components/Layout/Header'
import AdminNav from '../../components/Layout/AdminNav'
import Container from 'react-bootstrap/Container'

function ClientCrud() {
  return (
    <>
      <Header title={'Administration'} />
      <Container className="grid">
        <AdminNav />
        <main>
          <h2>client crud</h2>
        </main>
      </Container>
    </>
  )
}

export default ClientCrud
