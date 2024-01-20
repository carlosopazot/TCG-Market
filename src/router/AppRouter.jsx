import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Row, Col, Layout } from "antd"
import Navbar from "../components/Navbar/NavBar"
import ItemListContainer from "../components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer"
import CartView from "../components/CartView/CartView"
import Checkout from "../components/Checkout/Checkout"
import NotFound from "../components/NotFound/NotFound"
import Login from "../components/Login/Login"

const AppRouter = () => {
  const { user } = useContext(UserContext)
  const isLoggedIn = user.logged
  return (
    <BrowserRouter>
      <Navbar />
      <Layout className='layout'>
        <Layout>
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
                  <Route path="/login" element={<Login />}></Route>
                </Routes>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter