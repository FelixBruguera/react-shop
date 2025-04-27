import { NavLink } from "react-router"
import { ShoppingCart } from "lucide-react"
import { useState } from "react";
import Cart from './Cart'
import SlideMenu from "./SlideMenu";
import styles from '../styles/Nav.module.css'

const Nav = ({ cart, setCart }) => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartClosing, setCartClosing] = useState(false)
    const linkClass = ({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : styles.link

    const handleCartClose = () => {
        setCartOpen(false)
        setCartClosing(false)
    }
    return (
        <nav className={styles.nav} aria-label='Top menu'>
            <div className={styles.links}>
                <NavLink
                to="home"
                className={(isActive, isPending) => linkClass(isActive, isPending)}
                viewTransition>
                Home
                </NavLink>
                <NavLink
                to="shop"
                className={(isActive, isPending) => linkClass(isActive, isPending)}
                viewTransition>
                Store
                </NavLink>
            </div>
            <button aria-label='open cart' className={styles.cart} onClick={() => setCartOpen(true)}>
                <ShoppingCart size={26} />
                { cart.length > 0 ? <p className={styles.cartNumber}>{cart.length}</p> : null }
            </button>
            <SlideMenu isOpen={cartOpen} isClosing={cartClosing} closeSlide={handleCartClose} setIsClosing={setCartClosing} position='right'>
                <Cart cart={cart} setCart={setCart}/>
            </SlideMenu>
        </nav>
    )
}

export default Nav