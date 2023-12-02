import { useState, useEffect } from "react"
import { getData } from "../../utils/utils"
import ItemList from "../ItemList/ItemList"

const ItemListContainer = () => {
  const [ cards, setCards ] = useState([])
  const [loading, setLoading ] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    getData()
      .then((data) => { 
        setCards(data)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {
        loading
          ? <h2>Cargando...</h2>
          : <ItemList title='Últimas cartas' cards={cards}/>
      }
    </>
  )
}

export default ItemListContainer