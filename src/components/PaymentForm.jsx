import styles from "../styles/PaymentForm.module.css"
import Button from "./Button"

const PaymentForm = ({ total, name, setName, onSubmit, cardNumber, setCardNumber }) => {
    const date = new Date().toISOString().split('T')[0]
    // Helper function to format the credit card number
    const formatCreditCardNumber = (value) => {
        const digits = value.replace(/\D/g, '')
        let formatted = ''
        for (let i = 0; i < digits.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' '
            }
            formatted += digits[i]
            }
        return formatted.substring(0, 19)
    }
    const onCardChange = (newNumber) => {
        const formatted = formatCreditCardNumber(newNumber)
        setCardNumber(formatted)
    }

    return (
        <form className={styles.payment} onSubmit={(e) => onSubmit(e)}>
                <h2 className={styles.paymentTitle}>Payment details</h2>
                <div className={styles.inputField}>
                    <label htmlFor="card-name">Your name</label>
                    <input type="text" name="card-name" id="card-name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="card-number">Card Number</label>
                    <input id="card-number" type="tel" inputMode="numeric" autoComplete="cc-number" 
                        placeholder="**** **** **** ****" className={(cardNumber.length >0 && cardNumber.length < 16) ? styles.invalidInput : null} 
                        value={cardNumber} onChange={(e) => onCardChange(e.target.value)} required />
                </div>
                <div className={styles.cardFields}>
                    <div className={styles.inputField}>
                        <label htmlFor="card-date">Expiration Date</label>
                        <input type="date" min={date} name="card-date" id="card-date" className={styles.cardDate} required />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="card-cvc">CVC</label>
                        <input type="number" min={100} max={999} name="card-cvc" id="card-cvc" placeholder="***" className={styles.cardCvc} required />
                    </div>
                </div>
                <div className={styles.paymentContainer}>
                    <div className={styles.cartTotal}>
                        <p className={styles.total}>Total</p>
                        <p className={styles.totalPrice} aria-label='cart total'>${total}</p>
                    </div>
                    <Button
                    style="dark"
                    type="submit"
                    label="pay"
                    title="Pay">
                        <p className={styles.payButton}>Pay</p>
                    </Button>
                </div>
            </form>
    )
}

export default PaymentForm