
import { Empty, Typography, Card, Flex, Button } from 'antd'
import './styles.css'
import SliderCard from '../SliderCard/SliderCard';

const { Title, Text } = Typography
const Image = 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'

const ItemList = ({ cards, title, onClick, loading }) => {
  return (
    <section>
      <Flex justify='space-between' align='center' style={{ marginBottom: '1rem'}}>
        <Title level={4} style={{ margin: 0 }}>{title || 'Cartas'}</Title>
        <Button onClick={onClick} type="default" size='large'>Ver todas</Button>
      </Flex>
      {cards.length > 0 ? (
        <SliderCard loading={loading} cards={cards} slides={6} />
      ) : (
        <Card>
          <Empty
            image={Image}
            description={
              <Text level={3} type="secondary">
                No hay cartas para mostrar
              </Text>
            }
          />
        </Card>
      )}
    </section>
  )
}

export default ItemList
