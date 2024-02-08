import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import ItemDetail from '../ItemDetail/ItemDetail'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'cards', itemId)
    getDoc(docRef)
      .then((docSnapshot) => {
        const doc = {
          ...docSnapshot.data(),
          id: docSnapshot.id,
        }
        setItem(doc)
      })
      .finally(() => setLoading(false))
  }, [itemId])

  return (
    <>
      {loading ? (
        <Spin
          tip="Cargando"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
          <div className="content" />
        </Spin>
      ) : (
        <ItemDetail item={item} />
      )}
    </>
  )
}

export default ItemDetailContainer
