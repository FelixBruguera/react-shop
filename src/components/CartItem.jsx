import styles from '../styles/Cart.module.css'
import {CircleX} from 'lucide-react'
import Dropdown from "./Dropdown"

const CartItem = ({ product, setCart}) => {
    const options = [1,2,3,4,5,6,7,8,9,10]
    const removeFromCart = () => setCart((cart) => cart.filter(prod => prod.id !== product.id))
    const onChange = (newQuantity) => {
        newQuantity = parseInt(newQuantity)
        const newProduct = {...product, quantity: newQuantity}
        setCart(cart => cart.map(prod => prod.id === product.id ? newProduct : prod))
    }

    return (
        <li className={styles.product} aria-label='cart product'>
            <img src={product.image} alt={product.title} className={styles.image}/>
            <p className={styles.productTitle} aria-label='cart product title'>{product.title}</p>
            <p className={styles.price} aria-label='cart product price'>${product.price}</p>
            <Dropdown 
            options={options} 
            label="Quantity" 
            currentValue={product.quantity} 
            labelClass={styles.quantity}
            onChange={onChange}
            />
            <button
            aria-label="remove from cart"
            title="Remove from cart"
            type="button" 
            className={styles.removeButton} 
            onClick={() => removeFromCart()}>
                <CircleX size={22}></CircleX>
            </button>
        </li>
    )

}

export default CartItem