import { Form, Select } from "antd"
import { StoreContext } from "../../context/StoreContext"
import { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
import { collection, query, getDocs, writeBatch, doc, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase/config"

const cities = [
  {
    value: 'Santiago',
    label: 'Santiago',
  },
  {
    value: 'Viña del Mar',
    label: 'Viña del Mar',
  },
  {
    value: 'Talca',
    label: 'Talca', 
  }
]

const StoreLocation = () => {
  
  const { store, setStore } = useContext(StoreContext)
  const { openMessage } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)

  const updateLocation = async (location) => {
    const q = query(
      collection(db, 'cards'),
      where('seller.id', '==', store.id)
    )
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db)

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { 'seller.location': location });
    });
    await batch.commit();
  };

  const handleChange = async (value) => {
    console.log('Ubicación:', value)
    setLoading(true)
    try {
      const storeRef = doc(db, 'stores', store.id); // Replace 'your_store_id' with the actual ID of your store document
      await updateDoc(storeRef, {
        ...store,
        location: value,
      });
      setStore({
        ...store,
        location: value
      })
      await updateLocation(value);
    } catch (error) {
      openMessage('error', 'Error al actualizar la ubicación de la tienda')
    } finally {
      setLoading(false)
      openMessage('success', 'Ubicación de la tienda actualizada')
      
    }
  };

  return (
    <Form layout='vertical'>
      <Form.Item rules={[{ required: true,  }]} label='Elige la ciudad donde te encuentras, esto ayudará en la búsqueda de tus cartas '>
        <Select loading={loading} defaultValue={store.location} showSearch onSelect={handleChange} placeholder='Selecciona una ciudad' options={cities} size='large'></Select>
      </Form.Item>
    </Form>
  )
}

export default StoreLocation