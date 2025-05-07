import styles from '../styles/Cart.module.css'
import {CircleX} from 'lucide-react'
import { Link } from 'react-router'
import Dropdown from "./Dropdown"

const CartItem = ({ product, removeFromCart, updateQuantity, setCartOpen}) => {

    return (
        <li className={styles.product}>
            <Link to={`/shop/${product.slug}`} className={styles.imageContainer} onClick={() => {setCartOpen(false)}} viewTransition>
                <img src={product.image} alt={product.title} className={styles.image}/>
            </Link>
            <div className={styles.productContent}>
                <div className={styles.productTop}>
                    <Link to={`/shop/${product.slug}`} className={styles.productTitle} title={product.title} onClick={() => {setCartOpen(false)}} viewTransition>
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
                    <p className={styles.price}>${product.price}</p>
                    <Dropdown
                        label="Quantity"
                        currentValue={product.quantity}
                        className={styles.quantity}
                        labelClass={styles.quantityLabel}
                        onChange={(e) => updateQuantity(product.id, e)}
                    />
                </div>
            </div>
        </li>
    )

}

export default CartItem