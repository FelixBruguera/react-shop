import styles from "../styles/QuantityInput.module.css";

const QuantityInput = ({ className, currentValue, onChange }) => {
  const increase = () => {
    if (currentValue >= 10) {
      return null;
    }
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    onChange(currentValue + 1);
  };
  const decrease = () => {
    if (currentValue <= 1 || isNaN(currentValue)) {
      return null;
    }
    onChange(currentValue - 1);
  };
  return (
    <div className={`${styles.quantity} ${className}`}>
      <button
        className={currentValue <= 1 ? styles.disabledArrow : styles.arrow}
        aria-label="decrease quantity"
        onClick={decrease}
      >
        -
      </button>
      <p className={styles.amount}>{currentValue}</p>
      <button
        className={currentValue === 10 ? styles.disabledArrow : styles.arrow}
        aria-label="increase quantity"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
