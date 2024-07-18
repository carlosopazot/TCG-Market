import { Result } from "antd"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { MailOutlined } from "@ant-design/icons"

const VerifyEmail = () => {
  const { user } = useContext(UserContext)

  if (!user.emailVerified) {
    return (
      <Result status="error" icon={<MailOutlined />} title="Ya falta poco" subTitle="Tu correo aún no ha sido verificado. Revisa tu bandeja de entrada y sigue las instrucciones." />
    )
  }
  return (
    <Result status="success" title="Correo verificado" subTitle="Tu correo ha sido verificado exitosamente." />
  )
}

export default VerifyEmail