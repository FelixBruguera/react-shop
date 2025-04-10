import { NavLink } from "react-router"
import styles from '../styles/Nav.module.css'

const Nav = () => {
    const linkClass = ({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : styles.link
    return (
        <nav className={styles.nav}>
            <NavLink 
            to="home"
            className={(isActive, isPending) => linkClass(isActive, isPending)}> 
            Home 
            </NavLink>
            <NavLink 
            to="shop"
            className={(isActive, isPending) => linkClass(isActive, isPending)}>
            Shop 
            </NavLink>
        </nav>
    )
}

export default Nav