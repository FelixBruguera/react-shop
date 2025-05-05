import styles from '../styles/Cart.module.css'
import {CircleX} from 'lucide-react'
import { Link } from 'react-router'
import Dropdown from "./Dropdown"

const CartItem = ({ product, setCart, removeFromCart, setCartOpen}) => {

    const onChange = (newQuantity) => {
        newQuantity = parseInt(newQuantity)
        const newProduct = {...product, quantity: newQuantity}
        setCart(cart => cart.map(prod => prod.id === product.id ? newProduct : prod))
    }

    return (
        <li aria-label='cart product' className={styles.product}>
            <Link to={`/shop/${product.slug}`} className={styles.imageContainer} aria-label='cart product image' onClick={() => {setCartOpen(false)}} viewTransition>
                <img src={product.image} alt={product.title} className={styles.image}/>
            </Link>
            <div className={styles.productContent}>
                <div className={styles.productTop}>
                    <Link to={`/shop/${product.slug}`} className={styles.productTitle} aria-label='cart product title' title={product.title} onClick={() => {setCartOpen(false)}} viewTransition>
                       <h3>{product.title}</h3>
                    </Link>
                    <button
                        aria-label="remove from cart"
                        title="Remove from cart"
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeFromCart(product.id)}>
                            <CircleX className={styles.icon}></CircleX>
                    </button>
                </div>
                <div className={styles.productBottom}>
                    <p className={styles.price} aria-label='cart product price'>${product.price}</p>
                    <Dropdown
                        label="Quantity"
                        currentValue={product.quantity}
                        className={styles.quantity}
                        labelClass={styles.quantityLabel}
                        onChange={onChange}
                    />
                </div>
            </div>
        </li>
    )

}

export default CartItem