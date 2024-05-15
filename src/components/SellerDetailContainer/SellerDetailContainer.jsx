import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import SellerDetail from '../SellerDetail/SellerDetail'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

const SellerContainer = () => {
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const { sellerId } = useParams()

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'stores', sellerId)
    getDoc(docRef)
      .then((docSnapshot) => {
        const doc = {
          ...docSnapshot.data(),
          id: docSnapshot.id,
        }
        setItem(doc)
      })
      .finally(() => setLoading(false))
  }, [sellerId])

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
        <SellerDetail seller={item}/>
      )}
    </>
  )
}

export default SellerContainer
