import styles from '../styles/Cart.module.css'
import { CreditCard } from 'lucide-react'
import CartItem from './CartItem'
import Button from './Button'

const Cart = ({ cart, setCart }) => {
    let total = cart.reduce((prev, product) => prev + (product.price * product.quantity), 0)
    const emptyCart = () => setCart([])
    const hasProducts = cart.length > 0

    return (
        <>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Cart</h2>
                {hasProducts ? 
                    <Button 
                    style='light'
                    label='clear your cart'
                    title='clear your cart'
                    onClick={() => emptyCart()}>
                        <p className={styles.emptyButton}>Clear</p>
                    </Button> 
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
                        <Button
                        style='dark'
                        label='checkout'
                        type='button'>
                            <div className={styles.checkout}>
                                <CreditCard size={24}></CreditCard>
                                <p className={styles.checkoutText}>Checkout</p>
                            </div>
                        </Button>
                    </div>
                </>
                : <p className={styles.empty} aria-label='empty cart'>Your cart is empty</p>
                }
            </ul>
        </>
    )
}

export default Cart