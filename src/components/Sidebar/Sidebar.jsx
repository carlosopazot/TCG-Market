import { Layout } from "antd";
import NavMenu from "../NavMenu/NavMenu";
import './styles.css'

const { Sider } = Layout

const Sidebar =() => {
  return(
    <Sider 
      className="sidebar"
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <NavMenu></NavMenu>
    </Sider>  
  )
}

export default Sidebar