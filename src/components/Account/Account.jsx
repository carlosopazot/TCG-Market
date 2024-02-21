import { Row, Col, Typography, Card, Form, Input } from 'antd'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const { Title } = Typography

const Account = () => {
  const { user } = useContext(UserContext)
  return (
    <Row>
      <Col xs={24}>
        <Title level={2}>Mi cuenta</Title>
        <p></p>
      </Col>
      <Col>
        <Card>
          <Form>
            <Form.Item>
              <Input value={user.name}></Input>
            </Form.Item>
            <Form.Item>
              <Input value={user.email}></Input>
            </Form.Item>
            <Form.Item>
              <Input value={user.phone}></Input>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Account
