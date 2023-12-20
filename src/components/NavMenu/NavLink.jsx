import { Link } from "react-router-dom";

const NavLink = ({ href, text }) => {
  return (
    <Link to={href}>
    {text}
    </Link>
  )
}

export default NavLink