import { ListGroup, Badge } from 'react-bootstrap'

export default function CartItem(props) {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.title}</div>
      </div>
      <Badge bg="dark" text="light">
        {props.price}€
      </Badge>
    </ListGroup.Item>
  )
}
