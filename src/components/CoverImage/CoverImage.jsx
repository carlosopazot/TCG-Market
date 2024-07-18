import { Image, Skeleton, Tag } from "antd"
import imgPlaceholder from '../../assets/images/magic_card_back.webp'
import './styles.css'

const CoverImage = ({ item, noTag, width, loading }) => {

  if (loading) {
    return <Skeleton active paragraph={{ rows: 0 }} />
  }

  return (
    <div className="cover-container">
      {item.foil && <div className='is-foil'></div>}
      <Image width={width} className="cover-img" preview={false} alt={item.name} src={item.image || imgPlaceholder} />
      {!noTag && <Tag className='tag-name'>{item.name}</Tag>}
    </div>
  )
}

export default CoverImage