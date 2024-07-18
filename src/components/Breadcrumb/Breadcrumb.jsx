import { Breadcrumb as AntdBreadcrumb } from "antd"
import { Link, useLocation } from "react-router-dom"

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb = () => {
  const currentTitle = document.title
  console.log(currentTitle)
  const location = useLocation()
  const paths = location.pathname.split('/').filter((path) => path)
  
  const breadcrumbItems = [
    {
      title: (
        <Link to='/'>Inicio</Link>
      ),
      key: 'home',
    }
  ].concat(
    paths.map((last, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      if (index === paths.length - 1) {
        return {
          title: capitalize(last),
          key: url,
        };
      }
      return (
        {
          title: (
            <Link to={url}>{capitalize(last)}</Link>
          ),
          key: url,
        }
      );
    })
  );

  if (['/login', '/registro', '/', '/verificar-numero', '/not-found', '/search'  ].includes(location.pathname)) {
    return null;
  }

  return (
    <AntdBreadcrumb items={breadcrumbItems} style={{ marginBottom: '1rem'}}/>
  )
}

export default Breadcrumb
