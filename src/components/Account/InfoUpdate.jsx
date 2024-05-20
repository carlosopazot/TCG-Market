import { useState, useContext } from 'react'
import { Card, Form, Input, Button, Flex } from 'antd'
import { UserContext } from '../../context/UserContext'


const InfoUpdate = () => {
  const { user } = useContext(UserContext)
  const [ disabled, setDisabled ] = useState(true)

  const editForm = () => {
    setDisabled(false)
  }

  return (
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
  )
}
export default InfoUpdate;