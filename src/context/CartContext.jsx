import { createContext, useState } from 'react'
import { notification } from 'antd'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (item, placement, type) => {
    api[type]({
      message: 'Listo',
      description: `La carta ${item.name} fue agregada con exito`,
      placement,
    })
  }

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    )
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += item.quantity
      setCart(updatedCart)
    } else {
      setCart((prevCart) => [...prevCart, item])
    }
    openNotification(item, 'topRight', 'success')
  }

  const calculateItemTotal = (quantity, price) => quantity * price

  const isInCart = (id) => {
    return cart.some((item) => item.id === id)
  }

  const clearCart = () => {
    setCart([])
  }

  const itemsInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  const totalCart = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
    return total.toFixed(2)
  }

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        addToCart,
        clearCart,
        itemsInCart,
        totalCart,
        removeItem,
      }}
    >
      {contextHolder}
      {children}
    </CartContext.Provider>
  )
}
