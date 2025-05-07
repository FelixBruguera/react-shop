import styles from '../styles/Cart.module.css'
import { CreditCard } from 'lucide-react'
import CartItem from './CartItem'
import Button from './Button'
import { Link } from 'react-router'

const Cart = ({ cart, emptyCart, removeFromCart, updateQuantity, setCartOpen }) => {
    let total = cart.reduce((prev, product) => prev + (product.price * product.quantity), 0)
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
            {hasProducts ?
                <div className={styles.cartContent}>
                    <ul aria-label='cart products' className={styles.cartProducts}>
                        {cart.map((product) => <CartItem key={product.id} product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart} setCartOpen={setCartOpen}/>)}
                    </ul>
                        <div className={styles.totalCheckout}>
                            <div className={styles.cartTotal}>
                                <p className={styles.total}>Total</p>
                                <h3 className={styles.title}>${total}</h3>
                            </div>
                            <Link 
                                to={'shop/checkout'}
                                className={`${styles.checkout} ${styles.button}`}
                                onClick={() => {
                                    setCartOpen(false)
                                    document.startViewTransition()
                                }}
                                >
                                <CreditCard className={styles.icon}></CreditCard>
                                <p className={styles.checkoutText}>Checkout</p>
                            </Link>
                        </div>
                </div>
                : <p className={styles.empty}>Your cart is empty</p>
                }
        </>
    )
}

export default Cart