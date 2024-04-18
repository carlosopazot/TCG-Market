import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Store from '../Store/Store'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const StoreContainer = () => {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const { storeId } = useParams()

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'stores', storeId)
    getDoc(docRef)
      .then((docSnapshot) => {
        const doc = {
          ...docSnapshot.data(),
          id: docSnapshot.id,
        }
        setItem(doc)
      })
      .finally(() => setLoading(false))
  }, [storeId])

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
        <Store item={item}/>
      )}
    </>
  )
}

export default StoreContainer
