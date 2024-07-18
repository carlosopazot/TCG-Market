import { useState, useContext } from 'react';
import { Form, Radio, Spin, Flex } from 'antd';
import { collection, query, getDocs, writeBatch, doc, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { StoreContext } from '../../context/StoreContext'
import { ThemeContext } from '../../context/ThemeContext'
import { LoadingOutlined } from '@ant-design/icons';

const StoreDollar = () => {

  const { store, setStore } = useContext(StoreContext)
  const { openMessage } = useContext(ThemeContext)
  const [loading, setLoading] = useState(false)

  const options = [
    { value: 900, label: '900' },
    { value: 850, label: '850' },
    { value: 800, label: '800' },
    { value: 750, label: '750' },
  ]

  const updateSellerDollarValue = async (newSellerDollarValue) => {
    const q = query(
      collection(db, 'cards'),
      where('seller.id', '==', store.id)
    )
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db)

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { 'seller.dollar': newSellerDollarValue });
    });
    await batch.commit();
  };

  const handleDollar = async ({ target: { value } }) => {
    console.log('Dolar:', value)
    setLoading(true)
    try {
      const storeRef = doc(db, 'stores', store.id); // Replace 'your_store_id' with the actual ID of your store document
      await updateDoc(storeRef, {
        ...store,
        dollar: value,
      });
      await updateSellerDollarValue(value);
      setStore({
        ...store,
        dollar: value
      })
    } catch (error) {
      openMessage('error', 'Error al actualizar el valor del dolar')
    } finally {
      setLoading(false)
      openMessage('success', 'Valor del dolar actualizado')
    }
  };

  return (
    <Form layout='vertical'>          
      <Form.Item label='Selecciona un valor de referencia para calcular el precio de tus cartas'>
        <Flex gap={8}>
          <Radio.Group
            buttonStyle="solid"
            onChange={handleDollar}
            options={options}
            optionType="button"
            defaultValue={store.dollar}
          >
          </Radio.Group>
          {loading && <Spin indicator={<LoadingOutlined />} />}
        </Flex>
      </Form.Item>
    </Form>  
  )
}

export default StoreDollar