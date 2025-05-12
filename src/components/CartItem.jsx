import styles from '../styles/CartItem.module.css'
import { Link } from 'react-router'
import QuantityInput from "./QuantityInput"
import { memo } from 'react'

const CartItem = memo(({ className, product, removeFromCart, updateQuantity, setCartOpen = null, previousUrl}) => {
    const onClick = () => {
        document.startViewTransition()
        setCartOpen ? setCartOpen() : null
    }

    return (
        <li className={`${styles.product} ${className}`}>
            <Link to={`/shop/${product.slug}`} className={styles.link} state={{ previousUrl: previousUrl}} onClick={() => onClick()}>
                <img src={product.image} alt={product.title} className={styles.image}/>
                <h3 className={styles.productTitle} title={product.title}>{product.title}</h3>    
            </Link>
            <p className={styles.price}>${product.price}</p>
            <button
                aria-label="remove from cart"
                title="Remove from cart"
                type="button"
                className={styles.removeButton}
                    onClick={() => removeFromCart(product.id)}>
                    <img src='/circleX.png' alt='close' className={styles.icon}></img>
            </button>
            <QuantityInput
                currentValue={product.quantity}
                className={styles.quantity}
                onChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
            />
        </li>
    )
})

export default CartItem