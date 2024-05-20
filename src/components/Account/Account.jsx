import { Row, Col, Typography, Tabs } from 'antd'
import { FileTextOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async'
import AvatarUpdate from './AvatarUpdate'
import InfoUpdate from './InfoUpdate';

const { Title } = Typography

const Account = () => {


  const items = [
    { label: 'Mis datos', 
      children: (
        <InfoUpdate />
      ), 
      key: '1',
      icon: <FileTextOutlined />
    },
    { label: 'Avatar', 
      children: (
        <AvatarUpdate />
      ), 
      key: '3',
      icon: <UserOutlined />
    },
    { label: 'Contraseña', children: 'Content of Tab Pane 2', key: '2' , disabled: true, icon: <KeyOutlined /> },
  ]

  const onChange = (key) => {
    console.log(key);
  };
  
  return (
    <>
      <Helmet>
        <title>Mi cuenta - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Title level={2}>Mi cuenta</Title>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Col>
      </Row>
    </>
  )
}

export default Account
