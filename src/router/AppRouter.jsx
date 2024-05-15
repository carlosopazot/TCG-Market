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
import SellerContainer from '../components/SellerDetailContainer/SellerDetailContainer'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'

const AppRouter = () => {
  const { user } = useContext(UserContext)

  console.log(user.logged)
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Navbar />
        <main className="main">
          <Row justify="center">
            <Col xs={24}>
              <Breadcrumb />
            </Col>
            <Col xs={24}>
              <Routes>
                <Route path="/" element={<ItemListContainer title="Cartas" />} />
                <Route
                  path="/tienda"
                  element={user.logged ? <Store /> : <Navigate to={'not-found'} />}
                />
                <Route path="/vendedor/:sellerId" element={<SellerContainer />} />
                <Route path="/cuenta" element={<Account />} />
                <Route
                  path="/verificar-numero"
                  element={ <VerifyNumber />}
                />
                <Route path="/search" element={<Search />} />
                <Route
                  path="/cards/:stateId"
                  element={<ItemListContainer title="Cartas" />}
                />
                <Route path="/cart" element={<CartView />} />
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                <Route path="/tienda/agregar-carta" element={<UploadCard />} />
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
