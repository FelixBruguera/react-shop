import styles from './styles/App.module.css'
import Nav from './components/Nav'
import { Outlet } from "react-router"
import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState({min: 0, max: 1000, category: 'all'})
  const [sort, setSort] = useState('category')
  const [cart, setCart] = useState([])
  const addToCart = (product) => {
    product.quantity = 1
    setCart(cart => cart.concat(product))
  }
  const removeFromCart = (productId) => setCart((cart) => cart.filter(product => product.id !== productId))

  return (
    <div className={styles.app}>
      <Nav cart={cart} setCart={setCart} removeFromCart={removeFromCart}/>
      <Outlet context={
        {
          cart: [cart, setCart, addToCart, removeFromCart],
          currentPage: [currentPage, setCurrentPage],
          filters: [filter, setFilter],
          sort: [sort, setSort]
        }
      }
      />
    </div>
  )
}

export default App
