import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = ({ tip }) => {
  return (
    <Spin
      tip={tip}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div className="content" />
    </Spin>
  )
}

export default Loader
