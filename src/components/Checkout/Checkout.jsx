import { Row, Col, Form, Input, Typography, Card, Button, Checkbox } from "antd"
import { useState } from "react";

const { Title } = Typography



const Checkout = () => {
  const [values, setValues] = useState ({
    name: '',
    lastname: '',
    email : ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit')
    console.log(values)
  }

  return (
    <Row justify='start'>
      <Col md={12}>
        <Title level={4}>Checkout</Title>
        <Card>
        <Form
            name="basic"
            layout="vertical"
            initialValues={values}
            onFinish={console.log(values)}
            autoComplete="off"
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar un nombre!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellido"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar un apellido!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit" block>
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Checkout