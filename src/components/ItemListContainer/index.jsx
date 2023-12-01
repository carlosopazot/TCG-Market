import { cards } from "../../data/data"

const ItemListContainer = ( { title, children } ) => {

  return (
    <div>
      <h3>{title}</h3>
      {children}
      {cards.map((item) => ( 
        <article key={item.id}>
          <h3>{item.name}</h3>
        </article>
      ))}
    </div>
  )
}

export default ItemListContainer