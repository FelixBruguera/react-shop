import styles from "../styles/Checkout.module.css"
import PaymentForm from "./PaymentForm"
import { useOutletContext, Link } from "react-router"
import CheckoutItem from "./CheckoutItem"
import { useState } from "react"
import Receipt from "./Receipt"

const Checkout = () => {
    const [cart, setCart, addToCart, removeFromCart] = useOutletContext().cart
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    let total = cart.reduce((prev, product) => prev + (product.price * product.quantity), 0)
    const hasProducts = cart.length > 0

    const onSubmit = (e) => {
        e.preventDefault()
        if (cardNumber.length < 16) { return alert('Invalid card number') }
        setProducts(cart)
        setIsSubmitted(true)
        setCart([])
    }

    if (isSubmitted) {
        return (
            <section className={styles.checkout}>
                <Receipt products={products} customerName={name}/>
            </section>
        )
    }

    if (!hasProducts) {
        return (
            <section className={styles.checkout}>
                <p className={styles.empty}>Your cart is empty</p>
            </section>
        )
    }

    return (
        <section className={styles.checkout}>
            <div className={styles.productsWrapper}>
                <h2 className={styles.sectionTitle}>
                    Your cart 
                    <p className={styles.productCount}>{cart.length} products</p>
                </h2>
                <ul aria-label='checkout products' className={styles.products}>
                    {cart.map((product) => <CheckoutItem key={product.id} product={product} setCart={setCart} />)}
                </ul>
            </div>
            <PaymentForm 
                total={total} 
                name={name} 
                setName={setName} 
                onSubmit={onSubmit} 
                cardNumber={cardNumber} 
                setCardNumber={setCardNumber}
            />
        </section>
    )
}

export default Checkout