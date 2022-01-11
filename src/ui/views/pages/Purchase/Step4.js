import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Step4() {
  return (
    <>
      <div>Step4</div>
      <Link to={'/step3'}>
        <Button className="w-100" type="submit">
          Previous step
        </Button>
      </Link>

      {/* <Link to={'/step4'}>
        <Button className="w-100" type="submit">
          Next step
        </Button>
      </Link> */}
    </>
  )
}
