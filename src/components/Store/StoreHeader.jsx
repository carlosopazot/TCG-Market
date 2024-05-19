import { Col, Typography, Button, Flex, Modal, Form, Select, Radio, Divider, Collapse, Spin } from 'antd'
import { PlusOutlined, SettingOutlined, EnvironmentOutlined, DollarOutlined, ExclamationCircleOutlined, CheckCircleOutlined, LoadingOutlined} from '@ant-design/icons'
import './styles.css'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { db } from '../../firebase/config'
import { doc, updateDoc, collection, query, getDocs, where, writeBatch } from 'firebase/firestore'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import StoreTags from './StoreTags'

const { Title, Text } = Typography

const StoreHeader = ({ item }) => {
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const { store, setStore } = useContext(StoreContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDollar, setLoadingDollar] = useState(false);
  const disabledStore = user.phone === null;
  const uploadDisabled = store.location && store.dollar && !disabledStore ? false : true;
  const navigate = useNavigate()

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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      const storeRef = doc(db, 'stores', item.id); // Replace 'your_store_id' with the actual ID of your store document
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
      // message.success('Ubicación de la tienda actualizada')
      openMessage('success', 'Ubicación de la tienda actualizada')
      
    }
  };

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

  const options = [
    { value: 850, label: '850' },
    { value: 800, label: '800' },
    { value: 750, label: '750' },
  ]

  const handleDollar = async ({ target: { value } }) => {
    console.log('Dolar:', value)
    setLoadingDollar(true)
    try {
      const storeRef = doc(db, 'stores', item.id); // Replace 'your_store_id' with the actual ID of your store document
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
      setLoadingDollar(false)
      openMessage('success', 'Valor del dolar actualizado')
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <Flex gap={8}>
          <EnvironmentOutlined />
          <Title style={{ margin: 0 }} level={5}>Ciudad</Title>
        </Flex>
      ),
      children: (
        <Form layout='vertical'>
          <Form.Item rules={[{ required: true,  }]} label='Elige la ciudad donde te encuentras, esto ayudará en la búsqueda de tus cartas '>
            <Select defaultValue={item.location} showSearch onSelect={handleChange} placeholder='Selecciona una ciudad' options={cities} size='large'></Select>
          </Form.Item>
        </Form>
      ),
      extra: (
        loading ? (
        <Text type='secondary'><Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />} /></Text>) : 
        (store.location ? (
          <Text type='success'><CheckCircleOutlined/> {store.location}</Text>
        ):(<Text type='warning'><ExclamationCircleOutlined/></Text>))
      )
    },
    {
      key: '2',
      label: (
        <Flex gap={8}>
          <DollarOutlined />
          <Title style={{ margin: 0 }} level={5}>Dólar</Title>
        </Flex>
      ),
      children: (
        <Form layout='vertical'>          
          <Form.Item label='Selecciona un valor de referencia para calcular el precio de tus cartas'>
            <Radio.Group
              buttonStyle="solid"
              onChange={handleDollar}
              options={options}
              optionType="button"
              defaultValue={store.dollar}
            >
            </Radio.Group>
          </Form.Item>
        </Form>  
      ),
      extra: (
        loadingDollar ? (
          <Text type='secondary'><Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />} /></Text>
        ) : (
          store.dollar ? (
            <Text type='success'><CheckCircleOutlined/> Dolar {store.dollar}</Text>
          ) : (<Text type='warning'><ExclamationCircleOutlined/></Text>)
        )
      )
    }
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Col xs={24} md={12} lg={20}>
        <Flex gap={8}>
          <Flex vertical gap={8}>
            <Title  style={{ margin: 0 }} level={2}>Mi tienda</Title>
            <StoreTags item={store} />
          </Flex>
        </Flex>
      </Col>
      
      <Col xs={24} md={12} lg={4}>
        <Flex gap={8} justify="end">
          <Button block disabled={disabledStore} onClick={showModal} icon={<SettingOutlined />} size="large">
            Configurar
          </Button>
          <Button onClick={()=>{navigate('/tienda/agregar-carta')}} block disabled={uploadDisabled} type="primary" icon={<PlusOutlined />} size="large">
            Agregar carta
          </Button>
        </Flex>
      </Col>
     
      <Modal 
        footer={null} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        title={(
          <Flex gap={8}>
            <Title style={{ margin: 0 }} level={4}><SettingOutlined /> Configura tu tienda</Title>
          </Flex>
        )}
      >
        <Divider></Divider>
        <Collapse expandIconPosition='end' items={items} onChange={onChange} />
      </Modal>
    </>
  )
}

export default StoreHeader
