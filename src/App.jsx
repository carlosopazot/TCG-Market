import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import { SearchProvider } from './context/SearchContext'
import './assets/css/App.css'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <AppRouter></AppRouter>
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
