import { Col, Typography, Button, Flex, Modal, Form, Input, Select, Radio, Divider, Collapse, message, Switch, Spin, Tag, Upload } from 'antd'
import { Link } from 'react-router-dom'
import { PlusOutlined, SettingOutlined, EnvironmentOutlined, DollarOutlined, ExclamationCircleOutlined, CheckCircleOutlined, LoadingOutlined} from '@ant-design/icons'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const StoreHeader = ({ matchStore, item }) => {
  const { user } = useContext(UserContext)
  const { store, setStore } = useContext(StoreContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDollar, setLoadingDollar] = useState(false);
  const disabledStore = user.phone === null;
  const uploadDisabled = store.location && store.dollar && !disabledStore ? false : true;
  console.log(uploadDisabled)
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
    } catch (error) {
      console.error('Error updating document:', error)
      message.error('Error al actualizar la ubicación de la tienda')
    } finally {
      setLoading(false)
      message.success('Ubicación de la tienda actualizada')
    }
  };

  const handleDollar = async ({ target: { value } }) => {
    console.log('Dolar:', value)
    setLoadingDollar(true)
    try {
      const storeRef = doc(db, 'stores', item.id); // Replace 'your_store_id' with the actual ID of your store document
      await updateDoc(storeRef, {
        ...store,
        dollar: value,
      });
      setStore({
        ...store,
        dollar: value
      })
      message.success('Valor del dólar actualizado')
    } catch (error) {
      console.error('Error updating document:', error)
      message.error('Error al actualizar el valor del dolar')
    } finally {
      setLoadingDollar(false)
    }
  };

  const options = [
    { value: 850, label: '850' },
    { value: 800, label: '800' },
    { value: 750, label: '750' },
  ]

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
      {matchStore ? (
        <>
          <Col xs={24} md={12} lg={20}>
            <Title style={{ marginBottom: '0.25rem' }} level={2}>Mi tienda</Title>
            <Flex gap={8}>
              {store.location ? (
                <>
                  <Tag color='blue' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><EnvironmentOutlined/> {store.location}</Tag>
                  <Tag color='green' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><DollarOutlined/> Dolar {store.dollar}</Tag>
                </>
              ):(<Tag color='warning' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><ExclamationCircleOutlined/> Sin configurar</Tag>)}
            </Flex>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Flex gap={8} justify="end">
              <Button block disabled={disabledStore} onClick={showModal} icon={<SettingOutlined />} size="large">
                Configurar
              </Button>
              {/* <Link  disabled={disabledStore || uploadDisabled} to="/agregar-carta">
                <Button block disabled={uploadDisabled} type="primary" icon={<PlusOutlined />} size="large">
                  Agregar carta
                </Button>
              </Link> */}
              <Button onClick={()=>{navigate('/agregar-carta')}} block disabled={uploadDisabled} type="primary" icon={<PlusOutlined />} size="large">
                Agregar carta
              </Button>
            </Flex>
          </Col>
        </>
      ) : (
        <Col xs={24}>
          <Title  style={{ margin: 0 }} level={2}>Tienda de {item.name}</Title>
        </Col> 
      )}
      <Col>
        
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
