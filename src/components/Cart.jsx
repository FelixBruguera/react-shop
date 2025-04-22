import styles from '../styles/Cart.module.css'
import { X, CreditCard } from 'lucide-react'
import CartItem from './CartItem'

const Cart = ({ cart, setCart }) => {
    let total = cart.reduce((prev, product) => prev + (product.price * product.quantity), 0)
    const emptyCart = () => setCart([])
    const hasProducts = cart.length > 0

    return (
        <div aria-label="cart">
            <div className={styles.titleContainer}>
                <p className={styles.title}>Cart</p>
                {hasProducts ? 
                    <button 
                    className={styles.reset}
                    aria-label='empty your cart'
                    title='Empty your cart'
                    onClick={() => emptyCart()}>
                        Empty
                    </button> 
                : null}
            </div>
            <ul aria-label='cart products' className={styles.cartProducts}>
                {hasProducts ?
                <>
                    {cart.map((product) => <CartItem key={product.id} product={product} setCart={setCart}/>)}
                    <div className={styles.totalCheckout}>
                        <div className={styles.cartTotal}>
                            <p className={styles.total}>Total:</p>
                            <p className={styles.totalPrice} aria-label='cart total'>${total}</p>
                        </div>
                        <button
                        aria-label='checkout'
                        className={styles.checkout}
                        type='button'>
                            <CreditCard size={24}></CreditCard>
                            Checkout
                        </button>
                    </div>
                </>
                : <p className={styles.empty} aria-label='empty cart'>Your cart is empty</p>
                }
            </ul>
        </div>
    )
}

export default Cart