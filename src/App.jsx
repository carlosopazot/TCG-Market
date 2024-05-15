import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import { SearchProvider } from './context/SearchContext'
import { StoreProvider } from './context/StoreContext'
import { HelmetProvider } from 'react-helmet-async';
import './assets/css/App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppRouter from './router/AppRouter'

const helmetContext = {}

function App() {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <UserProvider>
          <StoreProvider>
            <CartProvider>
              <SearchProvider>
                <AppRouter></AppRouter>
              </SearchProvider>
            </CartProvider>
          </StoreProvider>
        </UserProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
