import { useState, useEffect } from "react"
// import { getData } from "../../utils/utils"
import ItemList from "../ItemList/ItemList"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemListContainer = () => {
  const [ cards, setCards ] = useState([])
  const [ loading, setLoading ] = useState(true)

  const { stateId } = useParams()
  
  useEffect(() => {
    setLoading(true)

    // 1.- Armar una referencia (sync)
    const productosRef = collection(db, 'cards')
    const docsRef = stateId
                      ? query( productosRef, where('state', '==', stateId))
                      : productosRef
    // 2.- LLamar a esa referencia (async)
    getDocs(docsRef)
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        })
        
        console.log( docs )
        setCards( docs )
      })
      .finally(() => setLoading(false))

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