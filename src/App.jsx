import Navbar from './components/Navbar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { Layout } from 'antd'
import './assets/css/App.css'


function App() {

  return (
    <Layout className='layout'>
      <Navbar></Navbar>
      <ItemListContainer title="Últimas cartas"/>
    </Layout>
  )
}

export default App
