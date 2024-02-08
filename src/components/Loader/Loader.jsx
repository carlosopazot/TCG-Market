import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {
  return (
    <Spin
      tip="Cargando tus cartas"
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div className="content" />
    </Spin>
  )
}

export default Loader
