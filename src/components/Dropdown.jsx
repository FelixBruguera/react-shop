import styles from "../styles/Dropdown.module.css"

const Dropdown = ({ label, className, labelClass, currentValue, onChange }) => {
    const options = [1,2,3,4,5,6,7,8,9,10]
    return (
        <div className={`${styles.dropdown} ${className}`}>
            <label className={labelClass} htmlFor="quantity">{label}</label>
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