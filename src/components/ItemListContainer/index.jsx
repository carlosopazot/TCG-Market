import { useState, useEffect } from "react"
import { getData } from "../../utils/utils"
import ItemList from "./components/ItemList"

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
          : <ItemList cards={cards}/>
      }
    </>
  )
}

export default ItemListContainer