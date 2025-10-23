import styles from "../styles/Button.module.css"

const Button = ({ style, type, onClick, label, title, children }) => {
    return (
        <button 
        className={style === 'light' ? styles.light : styles.dark} 
        type={type || 'button'} 
        aria-label={label}
        title={title}
        onClick={onClick ? () => onClick() : null}>
            {children}
        </button>
    )
}

export default Button