export default function CartItem(props) {
  return (
    <div>
      <div id={props.id}>
        {props.title} <span>{props.price}€</span>
      </div>
    </div>
  )
}
