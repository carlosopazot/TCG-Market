import { Row, Col, Layout } from "antd"
import Navbar from "../components/Navbar/NavBar"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import ItemListContainer from "../components/ItemListContainer/ItemListContainer"
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer"
import CartView from "../components/CartView/CartView"
import Checkout from "../components/Checkout/Checkout"
import NotFound from "../components/NotFound/NotFound"
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import Sidebar from "../components/Sidebar/Sidebar"

const AppRouter = () => {
  const { user } = useContext(UserContext)
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Layout className='layout'>
        {user.logged ? 
            <Sidebar></Sidebar>
            : ''
        }
        <Layout
          className={user.logged ? 'layout-sider' : ''}
        >
          <Row justify='center'>
            <Col xs={24} lg={20}>
              {user.logged ? (
                <Routes>
                  <Route path='/' element={<ItemListContainer title="Cartas"/>}></Route>
                  <Route path='/cards/:stateId' element={<ItemListContainer title="Cartas"/>}></Route>
                  <Route path="/cart" element={<CartView />} />
                  <Route path='/item/:itemId' element={<ItemDetailContainer />}></Route>
                  <Route path='/checkout' element={<Checkout />}></Route>
                  <Route path='/not-found' element={ <NotFound/>}></Route>
                  <Route path='*' element={ <Navigate to={'not-found'} />}></Route>
                  <Route path="/register" element={ <Navigate to='/' />}></Route>
                  <Route path="/login" element={ <Navigate to='/' />}></Route>
                </Routes>
              ) : (
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              )}
            </Col>
          </Row>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter