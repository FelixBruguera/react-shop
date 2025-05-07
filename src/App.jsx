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
  const updateQuantity = (productId, newQuantity) => {
    newQuantity = parseInt(newQuantity)
    setCart(cart => cart.map(prod => prod.id === productId ? {...prod, quantity: newQuantity} : prod))
  }
  const emptyCart = () => setCart([])

  return (
    <div className={styles.app}>
       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=apparel,auto_stories,blender,category_search,desktop_windows,diamond,directions_car,grocery,self_care,sort_by_alpha,sports_and_outdoors,store,toys_and_games,trending_down,trending_up"/>            
      <Nav cart={cart} emptyCart={emptyCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>
      <Outlet context={
        {
          cart: cart, setCart: setCart, addToCart: addToCart, removeFromCart: removeFromCart, updateQuantity,
          emptyCart, currentPage: currentPage, setCurrentPage: setCurrentPage,filter: filter, setFilter: setFilter, 
          sort: sort, setSort: setSort
        }
      }
      />
    </div>
  )
}

export default App
