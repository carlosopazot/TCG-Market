import { Button } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

const WhatsappButton = ({ nameCard, sellerName, disabled }) => {
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
      size="large"
      block
      onClick={sendMessage}
      disabled={disabled}
    >
      Contactar
    </Button>
  )
}

export default WhatsappButton
