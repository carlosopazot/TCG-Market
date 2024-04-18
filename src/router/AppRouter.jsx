import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import Navbar from '../components/Navbar/NavBar'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from '../components/ItemDetailContainer/ItemDetailContainer'
import CartView from '../components/CartView/CartView'
import Checkout from '../components/Checkout/Checkout'
import NotFound from '../components/NotFound/NotFound'
import Store from '../components/Store/Store'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import UploadCard from '../components/UploadCard/UploadCard'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Account from '../components/Account/Account'
import Search from '../components/Search/Search'
import VerifyNumber from '../components/VerifyNumber/VerifyNumber'
import FooterHome from '../components/Footer/Footer'
import StoreContainer from '../components/StoreContainer/StoreContainer'

const AppRouter = () => {
  const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Navbar />
          <Row justify="center">
            <Col xs={24}>
              <Routes>
                <Route
                  path="/"
                  element={<ItemListContainer title="Cartas" />}
                ></Route>
                {/* <Route path="/tienda" element={<Store />}></Route> */}
                {user && user.logged && <Route path="/tienda/:storeId" element={<StoreContainer />}></Route>}
                <Route path="/cuenta" element={<Account />}></Route>
                {user && user.logged && <Route path="/verificar-numero" element={<VerifyNumber />}></Route>}
                <Route path="/search" element={<Search />}></Route>
                <Route
                  path="/cards/:stateId"
                  element={<ItemListContainer title="Cartas" />}
                ></Route>
                <Route path="/cart" element={<CartView />} />
                <Route
                  path="/item/:itemId"
                  element={<ItemDetailContainer />}
                ></Route>
                <Route path="/agregar-carta" element={<UploadCard />}></Route>
                <Route path="/checkout" element={<Checkout />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/registro" element={<Register />}></Route>
                <Route path="/not-found" element={<NotFound />}></Route>
                <Route path="*" element={<Navigate to={'not-found'} />}></Route>
              </Routes>
            </Col>
          </Row>
          <FooterHome/>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
