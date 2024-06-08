import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => (
  <>
    <Helmet>
      <title>404 - Card Market</title>
      <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
    </Helmet>
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, no pudimos encontrar lo que buscabas."
      extra={
        <Link to={'/'}>
          <Button size='large' type="primary">Volver a inicio</Button>
        </Link>
      }
  />
  </>
)
export default NotFound
