
import { Tag } from "antd"

const DollarTag = ({ price }) => {
  return (
    <Tag bordered={false} style={{ fontSize: '16px'}} color='success'>
     Dólar ${price}
    </Tag>
  )
}

export default DollarTag