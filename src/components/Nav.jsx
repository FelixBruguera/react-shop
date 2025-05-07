import { NavLink, useLocation } from "react-router"
import { ShoppingCart } from "lucide-react"
import { useState } from "react";
import Cart from './Cart'
import SlideMenu from "./SlideMenu";
import styles from '../styles/Nav.module.css'

const Nav = ({ cart, emptyCart, removeFromCart, updateQuantity }) => {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartClosing, setCartClosing] = useState(false)
    const linkClass = ({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : styles.link
    const location = useLocation()

    const handleCartClose = () => {
        setCartOpen(false)
        setCartClosing(false)
    }
    return (
        <nav className={styles.nav} aria-label='Top menu'>
            <div className={styles.links}>
                <NavLink
                    to="/"
                    className={(isActive, isPending) => linkClass(isActive, isPending)}
                    onClick={() => document.startViewTransition({types: ["backwards"]})}>
                    <h1>Home</h1>
                </NavLink>
                <NavLink
                    to="shop"
                    className={(isActive, isPending) => linkClass(isActive, isPending)}
                    onClick={() => document.startViewTransition({types: location.pathname === "/" ? ["forwards"] : ["backwards"]})}>
                    <h1>Store</h1>
                </NavLink>
            </div>
            <button aria-label='open cart' className={styles.cart} onClick={() => setCartOpen(true)}>
                <ShoppingCart className={styles.icon} />
                { cart.length > 0 ? <p className={styles.cartNumber}>{cart.length}</p> : null }
            </button>
            <SlideMenu isOpen={cartOpen} isClosing={cartClosing} closeSlide={handleCartClose} setIsClosing={setCartClosing} position='right'>
                <Cart cart={cart} emptyCart={emptyCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} setCartOpen={setCartOpen}/>
            </SlideMenu>
        </nav>
    )
}

export default Nav