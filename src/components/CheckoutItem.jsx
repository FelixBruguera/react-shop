import styles from "../styles/Checkout.module.css"
import { Link } from "react-router"
import Dropdown from "./Dropdown"
import { CircleX } from "lucide-react"

const CheckoutItem = ({ product, setCart }) => {
    const removeFromCart = () => setCart((cart) => cart.filter(prod => prod.id !== product.id))
    const onChange = (newQuantity) => {
        newQuantity = parseInt(newQuantity)
        const newProduct = {...product, quantity: newQuantity}
        setCart(cart => cart.map(prod => prod.id === product.id ? newProduct : prod))
    }
    return (
        <li className={styles.item}>
            <Link 
                to={`/shop/${product.slug}`} 
                className={styles.imageContainer} 
                aria-label='product image'
                state={{ previousUrl: '/shop/checkout'}}
                viewTransition
            >
                <img src={product.image} alt={product.title} className={styles.image}/>
            </Link>
            <div className={styles.productData}>
                <div className={styles.productTop}>
                    <Link 
                        to={`/shop/${product.slug}`} 
                        className={styles.productTitle} 
                        aria-label='product title'
                        title={product.title}
                        state={{ previousUrl: '/shop/checkout'}}
                        viewTransition
                    >
                        <h3>{product.title}</h3>
                    </Link>
                    <button
                        aria-label="remove from cart"
                        title="Remove from cart"
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeFromCart()}>
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

export default CheckoutItem