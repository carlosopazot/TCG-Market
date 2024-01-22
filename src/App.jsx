import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import './assets/css/App.css'
import AppRouter from './router/AppRouter';

function App() {

  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <AppRouter></AppRouter>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>

  )
}

export default App
