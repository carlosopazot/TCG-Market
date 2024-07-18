import { Card } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'
import TagsState from '../TagsState/TagsState'
import CoverImage from '../CoverImage/CoverImage'

const ItemCard = ({ item, loading }) => {

  return (
    <Link to={`/cartas/${item.id}`}>
      <Card
        className="card-item"
        hoverable
        cover={<CoverImage loading={loading} item={item} />}
      >
        <TagsState justify='center' size={14} item={item}/>
      </Card>
    </Link>
  )
}

export default ItemCard
