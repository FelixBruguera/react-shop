import styles from './styles/App.module.css'
import Homepage from './components/Homepage'
import Nav from './components/Nav'
import Shop from './components/Shop'
import { Outlet } from "react-router"
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])
  return (
    <div className={styles.app}>
      <Nav cart={cart} setCart={setCart}/>
      <Outlet context={[cart, setCart]}/>
    </div>
  )
}

export default App
