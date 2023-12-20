import { useState, useEffect } from "react"
import { getData } from "../../utils/utils"
import ItemList from "../ItemList/ItemList"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [ cards, setCards ] = useState([])
  const [ loading, setLoading ] = useState(true)

  const { stateId } = useParams()
  
  useEffect(() => {
    setLoading(true)
    getData()
      .then((data) => {
        const items = stateId 
                        ? data.filter(prod => prod.state === stateId)
                        : data

          setCards(items)
      })
      .finally(() => setLoading( false ))
  }, [stateId])

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