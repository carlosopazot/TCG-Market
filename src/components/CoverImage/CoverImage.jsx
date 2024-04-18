import { Image, Tag } from "antd"
import imgPlaceholder from '../../assets/images/magic_card_back.webp'
import './styles.css'

const CoverImage = ({ item }) => {
  return (
    <div className="cover-container">
      {item.foil && <div className='is-foil'></div>}
      <Image className="cover-img" preview={false} alt={item.name} src={item.image || imgPlaceholder} />
      <Tag className='tag-name'>{item.name}</Tag>
    </div>
  )
}

export default CoverImage