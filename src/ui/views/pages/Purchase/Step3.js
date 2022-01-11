import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Step3() {
  return (
    <>
      <div>Step3</div>
      <Link to={'/step2'}>
        <Button className="w-100" type="submit">
          Previous step
        </Button>
      </Link>

      <Link to={'/step4'}>
        <Button className="w-100" type="submit">
          Next step
        </Button>
      </Link>
    </>
  )
}
