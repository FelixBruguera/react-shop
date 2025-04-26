import styles from './styles/App.module.css'
import Nav from './components/Nav'
import { Outlet } from "react-router"
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])
  const addToCart = (product) => {
    product.quantity = 1
    setCart(cart => cart.concat(product))
  }
  const removeFromCart = (productId) => setCart((cart) => cart.filter(product => product.id !== productId))
  return (
    <div className={styles.app}>
      <Nav cart={cart} setCart={setCart}/>
      <Outlet context={[cart, setCart, addToCart, removeFromCart]}/>
    </div>
  )
}

export default App
