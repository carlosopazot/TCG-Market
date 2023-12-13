import { useState, useEffect } from "react"
import { getData } from "../../utils/utils"
import ItemList from "../ItemList/ItemList"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

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
          ? <Spin tip="Cargando" indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
              <div className="content" />
            </Spin>
          : <ItemList title='Últimas cartas' cards={cards}/>
      }
    </>
  )
}

export default ItemListContainer