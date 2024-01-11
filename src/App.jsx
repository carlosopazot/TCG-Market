import Navbar from './components/Navbar/NavBar'
import NotFound from './components/NotFound/NotFound';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import CartView from './components/CartView/CartView';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, Row, Col } from 'antd'
import { CartProvider } from './context/CartContext';
import './assets/css/App.css'
import Checkout from './components/Checkout/Checkout';



function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Layout className='layout'>
          <Row justify='center'>
            <Col xs={24} lg={20}>
              <Routes>
                <Route path='/' element={<ItemListContainer title="Cartas"/>}></Route>
                <Route path='/cards/:stateId' element={<ItemListContainer title="Cartas"/>}></Route>
                <Route path="/cart" element={<CartView />} />
                <Route path='/item/:itemId' element={<ItemDetailContainer />}></Route>
                <Route path='/checkout' element={<Checkout />}></Route>
                <Route path='/not-found' element={ <NotFound/>}></Route>
                <Route path='*' element={ <Navigate to={'not-found'} />}></Route>
              </Routes>
            </Col>
          </Row>
        </Layout>
      </BrowserRouter>
    </CartProvider>

  )
}

export default App
