import styles from './styles/App.module.css'
import Homepage from './components/Homepage'
import Nav from './components/Nav'
import Shop from './components/Shop'
import { Outlet } from "react-router"

function App() {
  return (
    <div className={styles.app}>
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
