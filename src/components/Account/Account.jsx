import { Row, Col, Typography, Card, Form, Input, Button, Flex, Tabs, Upload } from 'antd'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, FileTextOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';

const { Title } = Typography

const Account = () => {
  const { user } = useContext(UserContext)
  const [ disabled, setDisabled ] = useState(true)
  const fileList = []

  const editForm = () => {
    setDisabled(false)
  }

  const items = [
    { label: 'Mis datos', 
      children: (
        <Card title='Mis datos' extra={<Button onClick={editForm}>Editar</Button>}>
          <Form layout='vertical' disabled={disabled}>
            <Form.Item label='Nombre'>
              <Input size='large' value={user.name}></Input>
            </Form.Item>
            <Form.Item  label='Correo electrónico'>
              <Input size='large' value={user.email}></Input>
            </Form.Item>
            <Form.Item label='Número de teléfono'>
              <Input size='large' value={user.phone}></Input>
            </Form.Item>
            <Flex justify='flex-end'>
              <Button size='large' htmlType='submit' type='primary'>Guardar</Button>
            </Flex>
          </Form>
        </Card>
      ), 
      key: '1',
      icon: <FileTextOutlined />
    },
    { label: 'Avatar', 
      children: (
        <Card title='Foto de perfil'>
          <ImgCrop>
            <Upload
              maxCount={1}
              listType="picture"
              defaultFileList={[...fileList]}
            >
              <Button icon={<PlusOutlined />}>Upload</Button>
            </Upload>
          </ImgCrop>
        </Card>
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
      
      <Row gutter={16}>
        <Col xs={24} lg={8}>
          <Title level={2}>Mi cuenta</Title>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Col>

        {/* <Col xs={8}>
          <Card title='Foto de perfil'>
            <ImgCrop>
              <Upload 
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                showUploadList={false}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <PlusOutlined/>
                )}
              </Upload>
            </ImgCrop>
          </Card>
        </Col> */}
      </Row>
  )
}

export default Account
