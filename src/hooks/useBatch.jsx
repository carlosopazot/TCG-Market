import { collection, addDoc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState } from 'react'

const useBatch = ( item ) => {
  const batch = writeBatch(db)
  const itemRef = collection(db, item)

  const [itemId, setItemId] = useState(null)

  batch.commit()
  .then(() => {
    addDoc(itemRef, item).then((doc) => {
      setItemId(doc.id)
    })
  })

  return { itemId, setItemId  }
}

export default useBatch;