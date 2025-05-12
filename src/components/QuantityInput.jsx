import styles from "../styles/QuantityInput.module.css"

const QuantityInput = ({className, currentValue, onChange }) => {
    const increase = () => {
        if (currentValue >= 10) { return null }
        if (isNaN(currentValue)) { currentValue = 0}
        onChange(currentValue + 1)
    }
    const decrease = () => {
        if (currentValue <= 1 || isNaN(currentValue)) { return null }
        onChange(currentValue - 1)
    }
    const manualInput = (newValue) => {
        if (newValue > 10) { return onChange(10) }
        onChange(newValue)
    }
    return (
        <div className={`${styles.quantity} ${className}`}>
            <button 
                className={currentValue <= 1 ? styles.disabledArrow : styles.arrow}
                aria-label="decrease quantity"
                onClick={decrease}>
                -
            </button>
            <input 
                type="number"
                aria-label="quantity"
                className={isNaN(currentValue) || currentValue === 0 ? styles.invalidInput : styles.input} 
                min={1} 
                max={10} 
                value={currentValue}
                onChange={(e) => manualInput(e.target.value)} 
            />
            <button 
                className={currentValue === 10 ? styles.disabledArrow : styles.arrow}
                aria-label="increase quantity"
                onClick={increase}>
                +
            </button>
        </div>
    )
}

export default QuantityInput