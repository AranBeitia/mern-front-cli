import CardProduct from './CardProduct'

function CardProductFeed({ isEditable }) {
  return (
    <div className="grid-wrapper">
      <CardProduct isEditable={isEditable} />
    </div>
  )
}

export default CardProductFeed
