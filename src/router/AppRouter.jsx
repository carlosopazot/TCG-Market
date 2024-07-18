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
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Account from '../components/Account/Account'
import Search from '../components/Search/Search'
import VerifyNumber from '../components/VerifyNumber/VerifyNumber'
import VerifyEmail from '../components/VerifyEmail/VerifyEmail'
import FooterHome from '../components/Footer/Footer'
import SellerContainer from '../components/SellerDetailContainer/SellerDetailContainer'
import ResetPassword from '../components/ResetPassword/ResetPassword'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import CardDetail from '../components/CardDetail/CardDetail'
import StoreConfiguration from '../components/StoreConfiguration/StoreConfiguration'
import Cards from '../components/Cards/Cards'

const AppRouter = () => {
  const { user } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Navbar />
        <main className="main main-container">
          <Row justify="center">
            <Col xs={24}>
              <Breadcrumb />
            </Col>
            <Col xs={24}>
              <Routes>
                {user && user.logged ? (
                   <>
                      <Route path="/tienda" element={<Store />}/>
                      <Route path="/tienda/configuracion" element={<StoreConfiguration />} />
                      <Route
                        path="/verificar-numero"
                        element={ <VerifyNumber />}
                      />
                      <Route path="/verificar-email" element={<VerifyEmail />} />
                      <Route path="/cuenta" element={<Account />} />
                   </>
                  ) : null
                }
                <Route path="/recuperar-contrasena" element={<ResetPassword />} />
                <Route path="/" element={<ItemListContainer title="Cartas" />} />
                <Route path="/vendedor/:sellerId" element={<SellerContainer />} />
                <Route path="/buscador" element={<Search />} />
                <Route path="/cartas" element={<Cards />} />
                <Route
                  path="/cards/:stateId"
                  element={<ItemListContainer title="Cartas" />}
                />
                <Route path="/buscador/:cardId" element={<CardDetail />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/cartas/:itemId" element={<ItemDetailContainer />} />
                
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to={'not-found'} />} />
              </Routes>
            </Col>
          </Row>
        </main>
        <FooterHome />
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter
