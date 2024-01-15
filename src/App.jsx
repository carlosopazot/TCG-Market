import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ConfigProvider } from 'antd'
import './assets/css/App.css'
import AppRouter from './router/AppRouter';

function App() {

  return (
    <UserProvider>
      <CartProvider>
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                bodyBg: 'transparent',
                lightTriggerBg: '#444',
                lightTriggerColor: '#fff'
              },
            },
          }}
        >
          <AppRouter></AppRouter>
        </ConfigProvider>
      </CartProvider>
    </UserProvider>

  )
}

export default App
