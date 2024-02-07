import { Button } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

const WhatsappButton = ({ nameCard, sellerName }) => {
  const sendMessage = () => {
    const phoneNumber = '+56973392820' // Reemplaza con el número de teléfono al que deseas enviar el mensaje
    const message = encodeURIComponent(
      `¡Hola ${sellerName}! Me interesa tu carta ${nameCard} y quiero saber si está disponible`
    )
    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
      '_blank'
    )
  }

  return (
    <Button
      icon={<WhatsAppOutlined />}
      type="primary"
      style={{ marginBottom: '0.5rem' }}
      size="large"
      block
      onClick={sendMessage}
    >
      Contactar
    </Button>
  )
}

export default WhatsappButton
