import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'
import { Layout } from 'antd'
import './assets/css/App.css'


function App() {

  return (
    <Layout className='layout'>
      <Navbar></Navbar>
      <ItemListContainer title="Últimas cartas">
      </ItemListContainer>
    </Layout>
  )
}

export default App
