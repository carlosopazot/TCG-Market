import { Button } from "antd"

const Arrow = ({ onClick, style, icon, className }) => {
  return (
    <Button 
      style={{ ...style}} 
      className={`slick-btn-nav-custom ${className}`}
      shape="circle" 
      onClick={onClick} 
      icon={icon}
      type="default"
    >
    </Button>
  )
}

export default Arrow