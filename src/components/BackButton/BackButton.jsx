import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Button
      type="link"
      icon={<LeftOutlined />}
      onClick={handleBack}
      size="large"
      style={{ marginBottom: '1rem', paddingLeft: 0 }}
    >
      Volver
    </Button>
  )
}

export default BackButton
