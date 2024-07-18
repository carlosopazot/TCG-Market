
import { useContext } from 'react'
import { Row, Typography, Collapse, Col } from 'antd'
import { EnvironmentOutlined, DollarOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { StoreContext } from '../../context/StoreContext'
import StoreItemLabel from './StoreItemLabel'
import StoreLocation from './StoreLocation'
import StoreDollar from './StoreDollar'

const { Text } = Typography

const StoreConfiguration = () => {

  const { store } = useContext(StoreContext)

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: (
        <StoreItemLabel icon={<EnvironmentOutlined />} title='Ciudad' />
      ),
      children: (
        <StoreLocation />
      ),
      extra: (
        store.location ? (
          <Text type='success'><CheckCircleOutlined/> {store.location}</Text>
        ):(<Text type='warning'><ExclamationCircleOutlined/></Text>)
      )
    },
    {
      key: '2',
      label: (
        <StoreItemLabel icon={<DollarOutlined />} title='Dólar' />
      ),
      children: (
        <StoreDollar />
      ),
      extra: (
        store.dollar ? (
          <Text type='success'><CheckCircleOutlined/> Dólar {store.dollar}</Text>
        ) : (<Text type='warning'><ExclamationCircleOutlined/></Text>)
      )
    }
  ];

  return (
    <Row
      gutter={[16, 16]}
      justify='space-between'
    >
      <Col xs={24} lg={12}>
        <Collapse expandIconPosition='end' items={items} onChange={onChange} />
      </Col>
    </Row>
  ) 
}

export default StoreConfiguration