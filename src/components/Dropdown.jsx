import styles from "../styles/Dropdown.module.css"

const Dropdown = ({ options, label, labelClass, currentValue, onChange }) => {
    return (
        <div className={styles.dropdown}>
            <label className={`${labelClass} ${styles.label}`} htmlFor="quantity">{label}</label>
            <select className={styles.select} onChange={(e) => onChange(e.target.value)} value={currentValue} id="quantity">
                {options.map(opt => 
                <option
                key={opt}
                value={opt}
                className={styles.option}>
                    {opt}
                </option>
                )}
            </select>
        </div>
    )
}

export default Dropdown