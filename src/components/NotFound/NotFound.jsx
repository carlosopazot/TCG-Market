import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = () => (
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
)
export default NotFound
