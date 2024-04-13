import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import { SearchProvider } from './context/SearchContext'
import { StoreProvider } from './context/StoreContext'
import './assets/css/App.css'
import AppRouter from './router/AppRouter'

function App() {
  return (
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
  )
}

export default App
