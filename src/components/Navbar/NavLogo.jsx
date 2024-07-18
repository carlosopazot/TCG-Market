import { Link } from "react-router-dom"
import Logo from "../../assets/images/imagotipo.svg"
import LogoWhite from "../../assets/images/imagotipo-white.svg"
import Icon from "../../assets/images/sleeve-icon.svg"
import { ThemeContext } from "../../context/ThemeContext"
import { useContext } from "react"
import useMediaQuery from "../../hooks/useMediaQuery"

const NavLogo = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <Link to="/" className="brand">
      {isMobile ? 
        (<img src={Icon} style={{ width: '24px'}} alt="Logo" />) : 
        (<img src={isDarkMode ? LogoWhite : Logo} style={{ width: '120px'}} alt="Logo" />)
      }
    </Link>
  )
}

export default NavLogo