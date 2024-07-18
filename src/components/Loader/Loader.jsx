import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = ({ tip, top }) => {
  return (
    <Spin
      tip={tip}
      style={{ marginTop: top }}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div className="content" />
    </Spin>
  )
}

export default Loader
