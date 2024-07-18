import { Card, Typography, Flex, Button } from 'antd'
import TagsState from '../TagsState/TagsState'
import ItemCardDate from '../ItemCardDate/ItemCardDate'
import ItemCardPrice from '../ItemCardPrice/ItemCardPrice'
import { ShareAltOutlined } from '@ant-design/icons'
import useFetchVariants from '../../hooks/useFetchVariants'
import SearchItemTags from '../Search/SearchItemTags'
import './styles.css'

const { Title } = Typography

const CardInfo = ({ item, copyLink }) => {

  const { editions } = useFetchVariants(item.name)

  const filterItem = editions.filter((edition) => edition.id === item.scryId)
  const currentEdition = filterItem[0]
  console.log(filterItem[0])

  const actions = [
    <Button
      icon={<ShareAltOutlined />}
      type='text'
      size='large'
      onClick={copyLink}
      key='copy'
    >
      Compartir
    </Button>
  ].filter(Boolean)

  return (
    <Card
      actions={actions}
      className="card-info"
      title={<Title level={4} style={{ margin: 0 }}>{item.name}</Title>}
      extra={<ItemCardDate item={item} size={14}></ItemCardDate>}
    >
      <Flex gap={12} vertical>
        <Flex vertical gap={4}>
          <Title type='secondary' level={5} style={{ margin: 0 }}>{item.set_name}</Title>
          {currentEdition ? (<SearchItemTags edition={currentEdition}></SearchItemTags>) : null}
        </Flex>
        <TagsState size={16} stock={true} item={item}></TagsState>
        <ItemCardPrice title item={item}></ItemCardPrice>
      </Flex>
    </Card>
  )
}

export default CardInfo