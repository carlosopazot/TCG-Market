import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={'/'}><Button type="primary" >Volver a inicio</Button></Link>}
  />
);
export default NotFound;