import Navbar from './components/Navbar/NavBar'
import NotFound from './components/NotFound/NotFound';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from 'antd'
import './assets/css/App.css'



function App() {

  return (
    <BrowserRouter>
      <Layout className='layout'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<ItemListContainer title="Últimas cartas"/>}></Route>
          <Route path='/cards/:stateId' element={<ItemListContainer title="Últimas cartas"/>}></Route>
          <Route path='/item/:itemId' element={<ItemDetailContainer />}></Route>
          <Route path='/not-found' element={ <NotFound/>}></Route>
          <Route path='*' element={ <Navigate to={'not-found'} />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
